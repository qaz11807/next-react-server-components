'use client'

import { useState } from 'react'
import Link from 'next/link'
import timeAgo from '../lib/time-ago'
import styles from './story.module.css'
import CommentForm from './comment-form';

export default function Story({
  id,
  title,
  date,
  url,
  author,
  voted,
  weight,
  commentsCount,
  withComments = false
}) {
  const { host } = url ? new URL(url) : { host: '#' }
  const [isVoted, setVoted] = useState(voted)

  const onClickVote = async (e) => {
    e.preventDefault()

    const response = await fetch(`/api/posts/${id}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (response.redirected) {
      return window.location.assign(response.url)
    }

    setVoted(!isVoted)
  }

  const onClickAddComment = async (text) => {
    const response = await fetch(`/api/posts/${id}/comments`, {
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
    <>
      <div className={styles.story}>
        <div className={styles.title}>
          <span
            className={isVoted ? styles['votearrow--voted'] : styles.votearrow}
            onClick={onClickVote}
          >
            &#9650;
          </span>
          <a href={url}>{title}</a>
          {url && (
            <span className={styles.source}>
              {' ('}
              <a href={`http://${host}`}>{host.replace(/^www\./, '')}</a>
              {')'}
            </span>
          )}
        </div>
        <div className={styles.meta}>
          {weight} {plural(weight, 'point')} by{' '}
          <span>{author}</span>{' '}
          <Link href={`/item/${id}`}>
            <span suppressHydrationWarning>
              {timeAgo(new Date(date))} ago
            </span>
          </Link>{' '}
          |{' '}
          <Link href={`/item/${id}`}>
            {commentsCount} {plural(commentsCount, 'comment')}
          </Link>
        </div>
      </div>
      {      
        withComments && 
          <div className={styles.form}>
            <CommentForm onClick={onClickAddComment}/>
          </div>
      }
    </>
  )
}

const plural = (n, s) => s + (n === 0 || n > 1 ? 's' : '')
