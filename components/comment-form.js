'use client';

import { useState } from 'react';
import styles from './comment-form.module.css';

export default ({ onClick }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <textarea className={styles.textarea} value={text} onChange={(e)=>setText(e.target.value)}/>
      <button className={styles.button} onClick={onClick ? () => { onClick(text) } : null}>
        add comment
      </button>
    </div>
  )
}
