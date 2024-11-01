import { LoadingOutlined } from '@ant-design/icons'
import { Pagination, Spin } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetArticlesQuery } from '../../features/api/blogApi'
import Article from '../Article/Article'
import styles from './Articles.module.scss'

const Articles = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetArticlesQuery((page - 1) * 5)
  const navigate = useNavigate()

  if (isLoading) {
    return <Spin className={styles.Spin} indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
  }

  if (isError) {
    navigate('/error-message')
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
          favorited={item.favorited}
        />
      ))}
      <Pagination
        className={styles.Pagination}
        align="center"
        defaultCurrent={1}
        current={page}
        pageSize={5}
        showSizeChanger={false}
        total={data.articlesCount}
        onChange={(page) => {
          setPage(page)
        }}
      />
    </>
  )
}

export default Articles
