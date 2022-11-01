import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/cooking.module.css'

const Cooking: NextPage = () => {
  return (
    <>
    <Header />
    <CookList />
    </>
  )
}

export default Cooking

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.cookAppBox}>
        <h1 className={styles.cookApp}>Cook App</h1>
      </div>
    </header>
  )
}

interface CookProp {
  id: number
  name: string
}

const CookList = () => {
  const [cooks, setCooks] = useState<CookProp[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://127.0.0.1:4000/cook');
      const cooks = await res.json();
      setCooks(cooks);
    })()
  }, [])

  return (
    <CookListView cooks={ cooks }/>
  )
}

const CookListView = ({ cooks }) => {
  return (
    <>
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <h2 className={styles.cookList}>Cook list</h2>
        <div className={styles.flexInner}>
          {
            cooks.map((cook: CookProp, i: number) => (
              <div key={i} className={styles.cookImageBox}>
                <div className={styles.cookImage}>
                  <Image src='/../public/favicon.ico' width={100} height={100} layout='responsive'></Image>
                </div>
                <h3>{cook.name}</h3>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}