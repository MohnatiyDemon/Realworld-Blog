import { LoadingOutlined } from '@ant-design/icons'
import { Pagination, Spin } from 'antd'
import React from 'react'
import { useGetArticlesQuery } from '../../features/api/blogApi'
import Article from '../Article/Article'
import styles from './Articles.module.scss'

const Articles = () => {
  const { data, isLoading, error } = useGetArticlesQuery()
  if (isLoading) {
    return <Spin className={styles.Spin} indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
  }
  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <>
      {data?.articles?.map((item) => (
        <Article
          key={item.slug}
          title={item.title}
          description={item.description}
          tagList={item.tagList}
          updatedAt={item.updatedAt}
          image={item.author.image}
          favoritesCount={item.favoritesCount}
          author={item.author}
          slug={item.slug}
        />
      ))}
      <Pagination className={styles.Pagination} align="center" defaultCurrent={1} total={data.articlesCount} />
      <br />
    </>
  )
}

export default Articles
