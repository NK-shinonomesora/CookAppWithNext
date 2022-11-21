import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, createContext, useContext} from 'react'
import styles from '../styles/cooking.module.css'

interface CookStateProp {
  cooks: CookReturnProp[]
  setCooks: (cooks: CookReturnProp[]) => void
  whichPage: string
  setWhichPage: (page: string) => void
  cookData: CookData
  setCookData: (cookData: CookData) => void
  ListCookSelected: (id: number) => void
  ChangePage: () => void
}

interface CookReturnProp {
  id: number
  name: string
}

interface Cook {
  name: string
}

interface Material {
  name: string
}

interface Step {
  name: string
}

interface Materials {
  materials: Material[]
}

interface Steps {
  steps: Step[]
}

interface CookData {
  cook: Cook
  materials: Materials
  steps: Steps
}

const CookContext = createContext<CookStateProp | null>(null);

export const CookProp = () => {
  const [cooks, setCooks] = useState<CookReturnProp[]>([]);
  const [whichPage, setWhichPage] = useState<boolean>(true);
  const [cookData, setCookData] = useState<CookData>();

  const ChangePage = () => {
    setWhichPage((whichPage) => !whichPage);
  }

  const ListCookSelected = async (id: number) => {
    const res = await fetch(`http://127.0.0.1:4000/cook_and_material_and_step/${id}`);
    const data: CookData = await res.json();
    console.log(data);
    setCookData(data);
    ChangePage();
  }

  return {
    cooks: cooks,
    setCooks: setCooks,
    whichPage: whichPage,
    setWhichPage: setWhichPage,
    cookData: cookData,
    setCookData: setCookData,
    ListCookSelected: ListCookSelected,
    ChangePage: ChangePage,
  }
}

const Cooking: NextPage = () => {
  const cookState = CookProp();
  const { whichPage } = cookState;

  return (
    <>
    <CookContext.Provider value={cookState}>
      <Header />
      {
        whichPage
        ?
        <CookList />
        :
        <CookContent />
      }
    </CookContext.Provider>
    </>
  )
}

export default Cooking

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.cookAppBox}>
        <Link href={"./homepage"}>
          <h1 className={styles.cookApp}>Cook App</h1>
        </Link>
      </div>
    </header>
  )
}


const CookList = () => {
  const cookContext = useContext(CookContext);
  if(!cookContext) return null;
  const { cooks, setCooks, ListCookSelected } = cookContext;

  useEffect(() => {
    (async () => {
      const res = await fetch('http://127.0.0.1:4000/cook');
      const cooks = await res.json();
      setCooks(cooks);
    })()
  }, [])

  return (
    <CookListView cooks={ cooks } ListCookSelected={ListCookSelected}/>
  )
}

const CookListView = ({ cooks, ListCookSelected }) => {
  return (
    <>
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <h2 className={styles.cookList}>Cook list</h2>
        <div className={styles.flexInner}>
          {
            cooks.map((cook: CookReturnProp, i: number) => (
              <div key={i} className={styles.cookImageBox} onClick={() => ListCookSelected(cook.id) }>
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

const CookContent = () => {
  const cookContext = useContext(CookContext);
  if(!cookContext) return null;
  const { cookData, ChangePage } = cookContext;

  return (
    <>

<div className={styles.flex2}>
      <div className={styles.wrap2}>
        <h4 onClick={() => ChangePage()}>Back to Cooking List</h4>
        <p className={styles.title}>{cookData.cook.name}</p>
        <div className={styles.contentsBox}>
        <h5 className={styles.description}>Materials</h5>
          <ol>
          {
            cookData.materials.map((material: Material, i: number) => (
              <li className={styles.materailNameLi} key={i}>
                <p className={styles.materialP}>{material.name}</p>
              </li>
            ))
          }
          </ol>
          <h5 className={styles.description}>Steps</h5>
          <ol>
          {
            cookData.steps.map((step: Material, i: number) => (
              <li className={styles.materailNameLi} key={i}>
                <p className={styles.materialP}>{step.name}</p>
              </li>
            ))
          }
          </ol>
        </div>
      </div>
    </div>


    </>
  )
}