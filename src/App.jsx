import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import ArticlePage from './components/ArticlePage/ArticlePage'
import Articles from './components/Articles/Articles'
import CreateArticle from './components/CreateArticle/CreateArticle'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import Header from './components/Header/Header'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/article/:slug" element={<ArticlePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/article/:slug/edit" element={<CreateArticle />} />
        </Route>

        <Route path="*" element={<ErrorMessage />} />
        <Route path="/successful-message" element={<SuccessfulMessage />} />
      </Routes>
    </div>
  )
}

export default App
