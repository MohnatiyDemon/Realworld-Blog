import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../../stores/userSlice'
import styles from './UserHeader.module.scss'

const UserHeader = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  console.log(user) // не забудь удалить
  return (
    <div className={styles.UserHeader}>
      <Link to="/">
        <button className={`${styles.CreateArticle} ${styles.button}`}>Create article</button>
      </Link>
      <Link to="/">
        <button className={`${styles.User} ${styles.button}`}>{user.username}</button>
      </Link>
      <Link to="/">
        <button className={`${styles.LogOut} ${styles.button}`} onClick={() => dispatch(logOutUser())}>
          Log Out
        </button>
      </Link>
    </div>
  )
}

export default UserHeader
