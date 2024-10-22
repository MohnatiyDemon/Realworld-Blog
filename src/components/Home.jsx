import React, { useEffect, useState } from 'react'

const Home = () => {
  const [articles, setArticles] = useState([])

  const fetchApi = async () => {
    const data = await fetch('https://blog-platform.kata.academy/api/articles')
    const response = await data.json()
    setArticles(response.articles)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  useEffect(() => {
    console.log(articles)
  }, [articles])

  return (
    <div>
      {articles.map((item) => {
        return (
          <div key={item.slug}>
            {item.description}
            {item.title}
            {item.body}
            {item.author.username}{' '}
          </div>
        )
      })}
    </div>
  )
}

export default Home
