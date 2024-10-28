import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './SuccessfulMessage.module.scss'

const SuccessfulMessage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from
  const articleSlug = location.state?.articleSlug

  useEffect(() => {
    const timer = setTimeout(() => {
      if (from === 'profile') {
        navigate('/sign-in')
      } else if (from === 'new-article' && articleSlug) {
        navigate(`/article/${articleSlug}`)
      } else {
        navigate('/')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigate, from])

  return (
    <article className={styles.SuccessfulMessage}>
      <h2 className={styles.title}>Successful!</h2>
    </article>
  )
}

export default SuccessfulMessage
