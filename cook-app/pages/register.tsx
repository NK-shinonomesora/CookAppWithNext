import type { NextPage } from 'next'
import styles from '../styles/register.module.css'
import { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

const Register: NextPage = () => {
  return (
    <>
    <div className={styles.fullpage}>
      <Header />
      <Material />
    </div>
    </>
  )
}

export default Register

const Header = () => {
  return (
    <>
    <header className={styles.header}>
      <h2 >Register materials and steps</h2>
    </header>
    </>
  )
}

const Material = () => {
  const limitOfMaterialNum = 10;
  const [materialInputNum, setMaterialInputNum] = useState<number>(1);
  const [materials, setMaterials] = useState<string[]>(Array(limitOfMaterialNum).fill(""));

  const SetInputtedMaterial = (idx: number, value: string) => {
    materials[idx] = value;
    setMaterials(materials);
  }

  const AddInput = () => {
    setMaterialInputNum(materialInputNum + 1);
  }

  return (
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <p>Register materials</p>
        <div className={styles.materialBox}>
          <h5 className={styles.description}>{`Please input material to use. Limit is ${limitOfMaterialNum}. Clicking a plus mark increases a text box.`}</h5>
          <p>Material</p>
          {
            [...Array(materialInputNum)].map((_, i) => 
              <Fragment key={i}>
              <div className={styles.materialInputBox}>
              <input
                onChange={(e) => SetInputtedMaterial(i, e.target.value)}
                className={styles.materialInput} 
                type="text">
              </input>
              {
                // +記号は最下部のみに表示する
                (materialInputNum === i + 1 && materialInputNum < limitOfMaterialNum)
                &&
                <AiOutlinePlus
                  onClick={() => AddInput()}
                  className={styles.plus}
                  color="white">
                </AiOutlinePlus>
              }
              </div>
              </Fragment>
            )
          }
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.toStepBox}>
          <h4>To step</h4>
        </div>
      </div>
    </div>
  )
}