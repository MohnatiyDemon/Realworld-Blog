import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import { formatDate } from '../../utils/formatDate'
import styles from './Article.module.scss'

const Article = ({ slug, title, description, tagList, updatedAt, image, favoritesCount, author }) => {
  const navigate = useNavigate()

  const handleArticleOpenClick = () => {
    navigate(`/article/${slug}`)
  }
  return (
    <article className={styles.Article} onClick={handleArticleOpenClick}>
      <div className={styles['flex-body']}>
        <div className={styles['flex-title']}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.likes}>{favoritesCount}</span>
        </div>
        <div>
          {tagList &&
            tagList.map((tag, index) => {
              if (!tag.length) return
              return (
                <span className={styles.tag} key={index}>
                  {tag}
                </span>
              )
            })}
        </div>
        <p className={styles.paragraph}>{description}</p>
      </div>
      <div className={styles['flex-profile']}>
        <div className={styles['flex-column']}>
          <span className={styles.username}>{author?.username || 'Unknown Author'}</span>
          <span className={styles['post-date']}>{formatDate(updatedAt)}</span>
        </div>
        <img className={styles.avatar} src={image || defaultAvatar} alt="avatar" />
      </div>
    </article>
  )
}

export default Article
