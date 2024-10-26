import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import ArticlePage from './components/ArticlePage/ArticlePage'
import Articles from './components/Articles/Articles'
import Header from './components/Header/Header'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import SuccessfulLogin from './components/SuccessfulLogin/SuccessfulLogin'
import SuccessfulRegistration from './components/SuccessfulRegistration/SuccessfulRegistration'
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
        <Route path="/successful-registration" element={<SuccessfulRegistration />} />
        <Route path="/successful-login" element={<SuccessfulLogin />} />
      </Routes>
    </div>
  )
}

export default App
