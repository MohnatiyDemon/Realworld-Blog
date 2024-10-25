import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import { useGetAnArticleQuery } from '../../features/api/blogApi'
import { formatDate } from '../../utils/formatDate'
import styles from './ArticlePage.module.scss'

const ArticlePage = () => {
  const { slug } = useParams()
  const { data, isLoading, error } = useGetAnArticleQuery(slug)

  if (isLoading) {
    return <Spin className={styles.Spin} indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const { title, description, body, tagList, updatedAt, author, favoritesCount } = data.article

  return (
    <section className={styles.ArticlePage}>
      <div className={styles['flex-container']}>
        <div className={styles['flex-body']}>
          <div className={styles['flex-title']}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.likes}>{favoritesCount}</span>
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
          <img className={styles.avatar} src={author.image || defaultAvatar} alt="avatar" />
        </div>
      </div>
      <p className={styles.content}>{body}</p>
    </section>
  )
}

export default ArticlePage
