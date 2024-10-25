import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styles from './SignIn.module.scss'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data) // Вы можете отправить данные на сервер здесь
  }

  return (
    <form className={styles.SignIn} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Sign In</h2>
      <label className={styles['form-label']}>
        <span>Email address</span>
        <input
          className={styles['form-input']}
          placeholder="Email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className={styles['error-message']}>{errors.email.message}</p>}
      </label>
      <label className={styles['form-label']}>
        <span>Password</span>
        <input
          className={styles['form-input']}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errors.password && <p className={styles['error-message']}>{errors.password.message}</p>}
      </label>
      <input className={styles['form-submit']} type="submit" value="Login" />
      <span className={styles['form-span']}>
        Don’t have an account?{' '}
        <Link className={styles['form-span__link']} to="/sign-up">
          Sign Up
        </Link>
        .
      </span>
    </form>
  )
}

export default SignIn
