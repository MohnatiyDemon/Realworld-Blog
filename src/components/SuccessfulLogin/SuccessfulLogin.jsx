import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SuccessfulLogin.module.scss'

const SuccessfulLogin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <article className={styles.SuccessfulLogin}>
      <h2 className={styles.title}>Welcome Back!</h2>
      <p className={styles.paragraph}>Redirecting you to the homepage shortly...</p>
    </article>
  )
}

export default SuccessfulLogin
