'use client';

import { useState } from 'react';
import timeAgo from '../lib/time-ago';
import styles from './comment.module.css';
import CommentForm from './comment-form';

export default function Comment({ id, author, text, date, comments, voted, commentsCount }) {
  const [toggled, setToggled] = useState(false);
  const [isReplying, setReplying] = useState(false);
  const [isVoted, setVoted] = useState(voted)

  const toggle = () => setToggled(!toggled);

  const onClickVote = async (e) => {
    e.preventDefault()

    const response = await fetch(`/api/comments/${id}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    if (response.redirected) {
      return window.location.assign(response.url)
    }

    setVoted(!isVoted)
  }

  const onClickAddComment = async (text) => {
    const response = await fetch(`/api/comments/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ text: text })
    });

    if (response.redirected) {
      return window.location.assign(response.url)
    }

    window.location.reload()
  }

  return (
    <div className={styles.comment}>
      <div className={styles.meta} suppressHydrationWarning>
          <span
            className={isVoted ? styles['votearrow--voted'] : styles.votearrow}
            onClick={onClickVote}
          >
          &#9650;
        </span>
        {author} {timeAgo(new Date(date))} ago{' '}
        <span onClick={toggle} className={styles.toggle}>
          {toggled ? `[+${(commentsCount || 0) + 1}]` : '[-]'}
        </span>
      </div>

      {toggled
        ? null
        : [
            <div
              key="text"
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: text }}
            />,
            <div key="children" className={styles.children}>
              {comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </div>,
          ]}
      <button className={styles.reply} onClick={(e) => setReplying(!isReplying)}>
        {isReplying ? 'Cancel' : 'Reply'}
      </button>
      {
        isReplying && <CommentForm onClick={onClickAddComment}/>
      }
    </div>
  );
}
