import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.Header}>
      <li>
        <button className={`${styles.Home} ${styles.button}`}>Realworld Blog</button>
      </li>
      <div className={styles.flex}>
        <li>
          <button className={`${styles.SignIn} ${styles.button}`}>Sign In</button>
        </li>
        <li>
          <button className={`${styles.SignUp} ${styles.button}`}>Sign Up</button>
        </li>
      </div>
    </header>
  )
}

export default Header
