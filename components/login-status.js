'use client'

import styles from './login-status.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function LoginStatus({ isLogin = false }) {
  const router = useRouter()

  const onLogout = async (e) => {
    e.preventDefault();
    
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    window.location.reload()
  }

  return (
    <span className={styles.login}>
      {  
        isLogin ? 
          <button type='button' onClick={onLogout}> Logout </button> :
          <button type='button'>
            <Link href={`/login`}> Login </Link>
          </button>
      }
    </span>
  )
}
