import type { NextPage } from 'next'
import { Header } from './cooking'
import { useEffect, useState } from 'react'
import styles from '../styles/delete.module.css'

const Delete: NextPage = () => {
  return (
    <>
    <Header />
    <CookList />
    </>
  )
}

export default Delete

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

  const DeleteCook = async (id: number) => {
    if(!confirm("Do you really want to delete it?")) return;
    const res = await fetch(`http://127.0.0.1:4000/cook_and_material_and_step/${id}`, { method: 'DELETE' });
    if(res.ok) {
      const newCooks = cooks.filter((cook: CookProp, i: number) => cook.id !== id);
      console.log(newCooks);
      setCooks(newCooks);
    }
  }

  return (
    <CookListView cooks={ cooks } DeleteCook={ DeleteCook }/>
  )
}

const CookListView = ({ cooks, DeleteCook }) => {
  return (
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <h2 className={styles.description}>You can delete a cook when clicking it.</h2>
        <ul>
          {
            cooks.map((cook: CookProp, i: number) => (
              <li key={i} onClick={() => DeleteCook(cook.id)}>
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