import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SuccessfulRegistration.module.scss'

const SuccessfulRegistration = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/sign-in')
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <article className={styles.SuccessfulRegistration}>
      <h2 className={styles.title}>Registration Successful!</h2>
      <p className={styles.paragraph}>Redirecting to the login form...</p>
    </article>
  )
}

export default SuccessfulRegistration
