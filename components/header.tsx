import styles from './header.module.css'
import Link from 'next/link'
import { cookies } from "next/headers";
import LoginStatus from 'components/login-status'

const navItems = [
  { title: 'submit', path: '/submit' }
]

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <span className={styles.logo}>
            <span className={styles.n}>N</span>
          </span>
          <span className={styles['site-title']}>Hacker Next</span>
        </Link>
        <div className={styles.nav}>
          <ul className={styles['nav-ul']}>
            {navItems.map(({ title, path }, index) => (
              <Link href={path}>
                <li key={index}>
                  <span>{title}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.login}>
          <LoginStatus isLogin={cookies().get("Bearer") ? true : false} />
        </span>
      </div>
    </header>
  )
}
