import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useExistingUserLoginMutation } from '../../features/api/blogApi'
import { signInUser } from '../../stores/userSlice'
import renderServerError from '../../utils/renderServerError'
import styles from './SignIn.module.scss'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loginUser, { data, isError, error, isSuccess }] = useExistingUserLoginMutation()

  const isAuthError = error?.status === 422
  const errorMessage = 'Incorrect username or password.'

  const onSubmit = (user) => {
    loginUser({
      email: user.email,
      password: user.password,
    })
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(signInUser(data.user))
      localStorage.setItem('user-data', JSON.stringify(data.user))
      navigate('/successful-message', { state: { from: 'sign-in' } })
    }
    if (isError) {
      navigate('/error-message')
    }
  }, [isSuccess, isError, navigate, dispatch])

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
        {renderServerError(isError, isAuthError, errorMessage)}
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
