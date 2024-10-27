import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import {
  useFavoriteAnArticleMutation,
  useGetAnArticleQuery,
  useUnfavoriteAnArticleMutation,
} from '../../features/api/blogApi'
import { formatDate } from '../../utils/formatDate'
import handleImageError from '../../utils/handleImageError'
import styles from './ArticlePage.module.scss'

const ArticlePage = () => {
  const { slug } = useParams()
  const { data, isLoading, error } = useGetAnArticleQuery(slug)
  const [favoriteAnArticle] = useFavoriteAnArticleMutation()
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation()

  if (isLoading) {
    return <Spin className={styles.Spin} indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const { title, description, body, tagList, updatedAt, author, favoritesCount, favorited } = data.article

  const handleFavoriteClick = () => {
    if (!favorited) {
      favoriteAnArticle(slug)
    } else {
      unfavoriteAnArticle(slug)
    }
  }

  return (
    <section className={styles.ArticlePage}>
      <div className={styles['flex-container']}>
        <div className={styles['flex-body']}>
          <div className={styles['flex-title']}>
            <h2 className={styles.title}>{title}</h2>
            <label className={styles.favorite}>
              <button
                className={`${styles.favorite__button} ${favorited ? styles['favorite__button--active'] : ''}`}
                onClick={handleFavoriteClick}
              ></button>
              <span>{favoritesCount}</span>
            </label>
          </div>
          <div>
            {tagList.map((tag, index) => (
              <span className={styles.tag} key={index}>
                {tag}
              </span>
            ))}
          </div>
          <p className={styles.paragraph}>{description}</p>
        </div>
        <div className={styles['flex-profile']}>
          <div className={styles['flex-column']}>
            <span className={styles.username}> {author?.username || 'Unknown Author'}</span>
            <span className={styles['post-date']}>{formatDate(updatedAt)} </span>
          </div>
          <img className={styles.avatar} src={author.image || defaultAvatar} alt="avatar" onError={handleImageError} />
        </div>
      </div>
      <Markdown className={styles.Markdown}>{body}</Markdown>
    </section>
  )
}

export default ArticlePage
