import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import ArticlePage from './components/ArticlePage/ArticlePage'
import Articles from './components/Articles/Articles'
import CreateArticle from './components/CreateArticle/CreateArticle'
import ErrorPage from './components/ErrorPage/ErrorPage'
import Header from './components/Header/Header'
import PageNotFound from './components/PageNotFound/PageNotFound'
import PrivateRoute from './components/Routes/PrivateRoute'
import PublicRoute from './components/Routes/PublicRoute'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import SuccessfulMessage from './components/SuccessfulMessage/SuccessfulMessage'
import UserProfile from './components/UserProfile/UserProfile'
import { checkUserAuth } from './stores/userSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/article/:slug" element={<ArticlePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/article/:slug/edit" element={<CreateArticle />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
        <Route path="/error-message" element={<ErrorPage />}></Route>
        <Route path="/successful-message" element={<SuccessfulMessage />} />
      </Routes>
    </div>
  )
}

export default App
