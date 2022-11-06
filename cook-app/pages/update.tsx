import type { NextPage } from 'next'
import { Header } from './cooking'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import styles from '../styles/update.module.css'

const Update: NextPage = () => {
  return (
    <>
    <Header />
    <CookList />
    </>
  )
}

export default Update

interface CookProp {
  id: number
  name: string
}

const CookList = () => {
  const [cooks, setCooks] = useState<CookProp[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch('http://127.0.0.1:4000/cook');
      const cooks = await res.json();
      setCooks(cooks);
    })()
  }, []);

  const GoToRegister = (id: number) => {
    router.push({
      pathname: "./register",
      query: { id: id }
    });
  }

  return (
    <CookListView cooks={ cooks } GoToRegister={GoToRegister} />
  )
}

const CookListView = ({ cooks, GoToRegister }) => {
  return (
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <h2 className={styles.description}>You can update a cook when clicking it.</h2>
        <ul>
          {
            cooks.map((cook: CookProp, i: number) => (
              <li key={i} onClick={() => GoToRegister(cook.id)}>
                <section className={styles.btn}>
                  <a href="#" className={styles.btn_02}>{cook.name}</a>
                </section>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}