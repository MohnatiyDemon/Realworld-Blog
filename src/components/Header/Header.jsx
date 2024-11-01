import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserHeader from '../UserHeader/UserHeader'
import styles from './Header.module.scss'

const Header = () => {
  const token = useSelector((state) => state.user?.user?.token)
  return (
    <header className={styles.Header}>
      <Link to="/">
        <button className={`${styles.Home} ${styles.button}`}>Realworld Blog</button>
      </Link>
      {token ? (
        <UserHeader />
      ) : (
        <div className={styles.flex}>
          <Link to="/sign-in">
            <button className={`${styles.SignIn} ${styles.button}`}>Sign In</button>
          </Link>
          <Link to="/sign-up">
            <button className={`${styles.SignUp} ${styles.button}`}>Sign Up</button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
