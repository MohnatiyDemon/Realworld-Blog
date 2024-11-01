import styles from '../components/SignIn/SignIn.module.scss'

const renderServerError = (isError, isAuthError, ...errorMessage) => {
  if (isError && isAuthError) {
    return (
      <p className={styles['error-message']} style={{ marginTop: '-10px', marginBottom: '5px' }}>
        {errorMessage}
      </p>
    )
  } else if (isError) {
    return <p className={styles['error-message']}>An error occurred. Please try again later.</p>
  }
  return null
}

export default renderServerError
