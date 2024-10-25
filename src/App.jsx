import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import ArticlePage from './components/ArticlePage/ArticlePage'
import Articles from './components/Articles/Articles'
import Header from './components/Header/Header'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </div>
  )
}

export default App
