'use client'

import styles from './login-form.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const handler = async (operation, payload) => {
  const path = operation === 'login' ? 'login' : 'register'

  const response = await fetch(`/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const { success } = await response.json()

  return success
}

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const generateHandler = (operation) => {
    return async (e) => {
      e.preventDefault()

      const isSuccess = await handler(operation, { email: email, password: password })

      console.log(isSuccess)
      if (isSuccess) {
        setMessage(`${operation} success!`)

        router.back()
      }else {
        setMessage(`${operation} failed!`)
      }
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="email"> Your Email </label>
        <input className={styles.input} id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }}/>

        <label htmlFor="password"> Your Password </label>
        <input className={styles.input} id="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

        <span> {message} </span>

        <div className={styles.bar}>
          <button className={styles.button} id="submit" type="submit" onClick={generateHandler('login')}>
            Login
          </button>
          <button className={styles.button} id="register" type="submit" onClick={generateHandler('register')}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}
