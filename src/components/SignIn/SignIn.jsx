import styles from './SignIn.module.scss'

const SignIn = () => {
  return (
    <form className={styles.SignIn}>
      <h2 className={styles['form-title']}>Sign In</h2>
      <label className={styles['form-label']}>
        <span>Email address</span>
        <input className={styles['form-input']} type="email" placeholder="Email address" required />
      </label>
      <label className={styles['form-label']}>
        <span>Password</span>
        <input className={styles['form-input']} type="password" placeholder="Password" required minLength={6} />
      </label>
      <input className={styles['form-submit']} type="submit" value="Login" />
      <span className={styles['form-span']}>
        Don’t have an account? <a href="#">Sign Up</a>.
      </span>
    </form>
  )
}

export default SignIn
