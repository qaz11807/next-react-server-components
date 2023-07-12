'use client'

import styles from './submit-form.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SubmitForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  const onClick = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ title: title, url: url }),
    });

    const { success } = await res.json()

    if (success) {
      router.push('/')
    } else {
      setMessage('submit post failed')
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="title"> Title </label>
        <input className={styles.input} id="title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }}/>

        <label htmlFor="url"> Url </label>
        <input className={styles.input} id="url" type="text" value={url} onChange={(e) => {setUrl(e.target.value)}}/>

        <span> {message} </span>

        <button className={styles.button} id="submit" type="submit" onClick={onClick}>
          Submit
        </button>
      </form>
    </div>
  )
}
