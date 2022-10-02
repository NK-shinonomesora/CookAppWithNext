import type { NextPage } from 'next'
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <>
    <div className={styles.updiv}></div>
    <h1 className={styles.h1text}>Welcom to CookApp!</h1>
    <div className={styles.downdiv}></div>
    <p className={styles.ptext}>Let's Go</p>
    </>
  )
}

export default Home
