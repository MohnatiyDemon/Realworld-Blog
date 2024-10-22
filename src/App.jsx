import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import Articles from './components/Articles/Articles'
import Header from './components/Header/Header'
import Home from './components/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  )
}

export default App
