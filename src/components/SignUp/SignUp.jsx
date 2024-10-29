import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterANewUserMutation } from '../../features/api/blogApi'
import styles from './SignUp.module.scss'

const SignUp = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()
  const password = watch('password')
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus)
  }
  const getCheckboxClass = (agree) => {
    return agree
      ? `${styles['form-custom-checkbox']} ${styles['form-custom-checkbox--active']}`
      : styles['form-custom-checkbox']
  }

  const [registerUser, { isError, isLoading, error, isSuccess }] = useRegisterANewUserMutation()

  const onSubmit = (data) => {
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }
  useEffect(() => {
    if (isSuccess) {
      navigate('/successful-message', { state: { from: 'sign-up' } })
    }
  }, [isSuccess, navigate])

  return (
    <form className={styles.SignUp} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Create new account</h2>
      <label className={styles['form-label']}>
        <span>Username</span>
        <input
          className={styles['form-input']}
          type="text"
          placeholder="Username"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
            maxLength: { value: 20, message: 'Your username must be no more than 20 characters.' },
          })}
        />
        {errors.username && <p className={styles['error-message']}>{errors.username.message}</p>}
      </label>
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
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your password must be no more than 40 characters.' },
          })}
        />
        {errors.password && <p className={styles['error-message']}>{errors.password.message}</p>}
      </label>
      <label className={styles['form-label']}>
        <span>Repeat Password</span>
        <input
          className={styles['form-input']}
          type="password"
          placeholder="Password"
          {...register('confirmPassword', {
            required: 'You must confirm your password',
            validate: (value) => value === password || 'Password do not match',
          })}
        />
        {errors.confirmPassword && <p className={styles['error-message']}>{errors.confirmPassword.message}</p>}
      </label>
      <label className={styles.flex}>
        <span className={getCheckboxClass(checkboxStatus)}></span>
        <input
          className={styles['form-checkbox']}
          type="checkbox"
          onClick={handleCheckboxChange}
          {...register('checkbox', { required: 'You must agree to the processing of personal information' })}
        />
        <span>I agree to the processing of my personal information</span>
      </label>
      {errors.checkbox && <p className={styles['error-checkbox']}>{errors.checkbox.message}</p>}
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
