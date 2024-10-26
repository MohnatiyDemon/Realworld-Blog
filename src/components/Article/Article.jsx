import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import { useFavoriteAnArticleMutation, useUnfavoriteAnArticleMutation } from '../../features/api/blogApi'
import { formatDate } from '../../utils/formatDate'
import handleImageError from '../../utils/handleImageError'
import styles from './Article.module.scss'

const Article = ({ slug, title, description, tagList, updatedAt, image, favoritesCount, author, favorited }) => {
  const navigate = useNavigate()
  const [favoriteAnArticle] = useFavoriteAnArticleMutation()
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation()

  const handleArticleOpenClick = () => {
    navigate(`/article/${slug}`)
  }

  const handleFavoriteClick = () => {
    if (!favorited) {
      favoriteAnArticle(slug)
    } else {
      unfavoriteAnArticle(slug)
    }
  }

  return (
    <article className={styles.Article}>
      <div className={styles['flex-body']}>
        <div className={styles['flex-title']}>
          <h2 className={styles.title} onClick={handleArticleOpenClick}>
            {title}
          </h2>
          <label className={styles.favorite}>
            <button
              className={`${styles.favorite__button} ${favorited ? styles['favorite__button--active'] : ''}`}
              onClick={handleFavoriteClick}
            ></button>
            <span>{favoritesCount}</span>
          </label>
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
        <img className={styles.avatar} src={image || defaultAvatar} alt="avatar" onError={handleImageError} />
      </div>
    </article>
  )
}

export default Article
