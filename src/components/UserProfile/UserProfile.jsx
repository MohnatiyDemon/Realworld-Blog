import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUpdateCurrentUserMutation } from '../../features/api/blogApi'
import { logOutUser } from '../../stores/userSlice'
import styles from './UserProfile.module.scss'

const UserProfile = () => {
  const userData = useSelector((state) => state.user.user)
  console.log(userData)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password,
      avatar: userData?.image,
    },
  })

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [updateCurrentUser, { isError, isSuccess, error }] = useUpdateCurrentUserMutation()

  useEffect(() => {
    reset({
      username: userData?.username,
      email: userData?.email,
      password: '',
      avatar: userData?.image,
    })
  }, [userData, reset])

  const onSubmit = (user) => {
    updateCurrentUser({
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.avatar,
    })
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(logOutUser())
      navigate('/successful-message', { state: { from: 'profile' } })
    }
  }, [isSuccess, dispatch])

  if (isError) {
    console.log(error)
  }

  return (
    <form className={styles.UserProfile} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['form-title']}>Edit Profile</h2>

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
        <span>New password</span>
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
        <span>Avatar image(url)</span>
        <input
          className={styles['form-input']}
          type="text"
          placeholder="Avatar image"
          {...register('avatar', {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: 'Invalid URL for avatar image',
            },
          })}
        />
        {errors.avatar && <p className={styles['error-message']}>{errors.avatar.message}</p>}
      </label>

      <input className={styles['form-submit']} type="submit" value="Save" />
    </form>
  )
}

export default UserProfile
