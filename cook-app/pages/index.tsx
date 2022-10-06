import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  const firsttextRef = useRef<HTMLHeadingElement | null>(null)
  const secondtextRef = useRef<HTMLHeadingElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    firsttextRef.current?.addEventListener('animationend',() => {
      if(firsttextRef.current && secondtextRef.current) {
        firsttextRef.current.style.display = "none"
        secondtextRef.current.style.display = "block"
      }
    })
    secondtextRef.current?.addEventListener('animationend', () => {
      setTimeout(() => {
        router.push("./homepage")
      }, 1000)
    })
  }, [])

  return (
    <>
    <div className={styles.wrap}>
      <div className={styles.updiv}>
        <h1 className={styles.firsttext} ref={firsttextRef}>Welcom to CookApp!</h1>
        <h1 className={styles.secondtext} ref={secondtextRef}>Let's Go</h1>
      </div>
    </div>
    </>
  )
}

export default Home
