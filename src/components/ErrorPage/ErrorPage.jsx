import Link from 'antd/es/typography/Link'
import ErrorImage from '../../assets/icons/error.png'
import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
  return (
    <article className={styles.ErrorPage}>
      <img className={styles.ErrorImage} src={ErrorImage} alt="error" />
      <p className={styles.paragraph}>An unexpected error occurred, and we're already working to resolve it.</p>
      <Link to="/">
        <button className={styles.button}>Home page</button>
      </Link>
    </article>
  )
}

export default ErrorPage
