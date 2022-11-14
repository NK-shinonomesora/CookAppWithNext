import type { NextPage } from 'next'
import { Header } from './cooking'
import { useEffect, createContext, useContext, useState } from 'react'
import styles from '../styles/delete.module.css'

interface CookProp {
  id: number
  name: string
}

interface DeleteStateProp {
  cooks: CookProp[]
  setCooks: (cooks: CookProp[]) => void
  DeleteCook: (id: number) => void
}


const DeleteContext = createContext<DeleteStateProp | null>(null);

export const DeleteProp = () => {
  const [cooks, setCooks] = useState<CookProp[]>([]);

  const DeleteCook = async (id: number) => {
    if(!confirm("Do you really want to delete it?")) return;
    const res = await fetch(`http://127.0.0.1:4000/cook_and_material_and_step/${id}`, { method: 'DELETE' });
    if(res.ok) {
      const newCooks = cooks.filter((cook: CookProp, i: number) => cook.id !== id);
      console.log(newCooks);
      setCooks(newCooks);
    }
  }

  return {
    cooks: cooks,
    setCooks: setCooks,
    DeleteCook: DeleteCook
  }

}

const Delete: NextPage = () => {
  const deleteState = DeleteProp();
  const { setCooks } = deleteState;

  return (
    <>
    <DeleteContext.Provider value={deleteState}>
      <Header />
      <CookList />
    </DeleteContext.Provider>
    </>
  )
}

export default Delete


const CookList = () => {
  const deleteContext = useContext(DeleteContext);
  if(!deleteContext) return null;
  const { cooks, setCooks, DeleteCook } = deleteContext;

  useEffect(() => {
    (async () => {
      const res = await fetch('http://127.0.0.1:4000/cook');
      const cooks = await res.json();
      setCooks(cooks);
    })()
  }, [])

  return (
    <CookListView cooks={cooks} DeleteCook={DeleteCook}/>
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