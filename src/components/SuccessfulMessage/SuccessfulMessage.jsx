import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SuccessfulMessage.module.scss'

const SuccessfulMessage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <article className={styles.SuccessfulMessage}>
      <h2 className={styles.title}>Successful!</h2>
    </article>
  )
}

export default SuccessfulMessage
