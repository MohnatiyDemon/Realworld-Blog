import styles from './SignUp.module.scss'

const SignUp = () => {
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
        <input className={styles['']} type="checkbox" required />
        <span>I agree to the processing of my personal information</span>
      </label>
      <input className={styles['form-submit']} type="submit" value="Create" />
      <span className={styles['form-span']}>
        Already have an account? <a href="#">Sign Up</a>.
      </span>
    </form>
  )
}

export default SignUp
