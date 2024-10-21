import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus)
  }
  const getCheckboxClass = (agree) => {
    return agree
      ? `${styles['form-custom-checkbox']} ${styles['form-custom-checkbox--active']}`
      : styles['form-custom-checkbox']
  }

  return (
    <form className={styles.SignUp}>
      <h2 className={styles['form-title']}>Create new account</h2>
      <label className={styles['form-label']}>
        <span>Username</span>
        <input className={styles['form-input']} type="text" placeholder="Username" required />
      </label>
      <label className={styles['form-label']}>
        <span>Email address</span>
        <input className={styles['form-input']} type="email" placeholder="Email address" required />
      </label>
      <label className={styles['form-label']}>
        <span>Password</span>
        <input className={styles['form-input']} type="password" placeholder="Password" required minLength={6} />
      </label>
      <label className={styles['form-label']}>
        <span>Repeat Password</span>
        <input className={styles['form-input']} type="password" placeholder="Password" required minLength={6} />
      </label>
      <label className={styles.flex}>
        <span className={getCheckboxClass(checkboxStatus)}></span>
        <input className={styles['form-checkbox']} type="checkbox" onClick={handleCheckboxChange} required />
        <span>I agree to the processing of my personal information</span>
      </label>
      <input className={styles['form-submit']} type="submit" value="Create" />
      <span className={styles['form-span']}>
        Already have an account?{' '}
        <Link className={styles['form-span__link']} to="/sign-in">
          Sign In
        </Link>
        .
      </span>
    </form>
  )
}

export default SignUp
