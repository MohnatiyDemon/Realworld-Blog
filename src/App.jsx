import styles from './App.module.scss'
import Header from './components/Header/Header'
import SignIn from './components/SignIn/SignIn'

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <SignIn />
    </div>
  )
}

export default App
