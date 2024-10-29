import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import ArticlePage from './components/ArticlePage/ArticlePage'
import Articles from './components/Articles/Articles'
import CreateArticle from './components/CreateArticle/CreateArticle'
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
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/successful-message" element={<SuccessfulMessage />} />
        <Route
          path="/article/:slug/edit"
          element={
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
