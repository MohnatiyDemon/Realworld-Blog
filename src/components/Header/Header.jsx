import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.Header}>
      <Link to="/articles">
        <button className={`${styles.Home} ${styles.button}`}>Realworld Blog</button>
      </Link>
      <div className={styles.flex}>
        <Link to="/sign-in">
          <button className={`${styles.SignIn} ${styles.button}`}>Sign In</button>
        </Link>
        <Link to="/sign-up">
          <button className={`${styles.SignUp} ${styles.button}`}>Sign Up</button>
        </Link>
      </div>
    </header>
  )
}

export default Header
