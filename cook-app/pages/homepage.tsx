import type { NextPage } from 'next'
import Image from 'next/image'
import imagename from '../public/nature.jpeg'
import styles from '../styles/homepage.module.css'
import { FaBirthdayCake } from "react-icons/fa";
import {AiOutlineCaretDown} from "react-icons/ai"

const HomePage: NextPage = () => {
  return (
    <>
    <Header />
    <IntroduceApp />
    </>
  )
}

export default HomePage

const Header = () => {
  return (
    <header className={styles.header}>
      <Image className={styles.backimage} src={imagename} layout="fill"/>
      <div className={styles.headerBox}>
        <HeaderCake />
        <HeaderList />
      </div>
      <AiOutlineCaretDown className={styles.downcorsor} color='white' size='3em'></AiOutlineCaretDown>
    </header>
  )
}

const HeaderCake = () => {
  return (
    <div className={styles.cakeBox}>
      <div className={styles.cake}>
        <FaBirthdayCake color='#D9E5FF' size='5em'></FaBirthdayCake>
      </div>
      <div className={styles.caketext}>
        <span className={styles.caketexttop}>Welcom to Cook App!!!</span><br></br>
        <span className={styles.caketextbottom}>Let's fan cook and eat.</span>
      </div>
    </div>
  )
}

const HeaderList = () => {
  return (
    <div className={styles.listBox}>
      <div className={styles.listBoxBorder}>
        <p><span>Cooking</span></p>
        <p><span>Register</span></p>
      </div>
    </div>
  )
}

const IntroduceApp = () => {
  return (
    <>
    <div className={styles.heightadjustment}></div>
    <div className={styles.introduceBox}>
      <div>
        <h1>Let's enjoy cooking.</h1>
        <p>Cooking in live alone is too troublesome.</p><br></br>
        <p>Let's master Quick and easy cooking on this site.</p>
      </div>
    </div>
    </>
  )
}

