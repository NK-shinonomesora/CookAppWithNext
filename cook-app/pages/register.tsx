import type { NextPage } from 'next'
import styles from '../styles/register.module.css'
import { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

const Register: NextPage = () => {
  const limitOfMaterialNum = 10;
  const [whichPage, setWhichPage] = useState<string>("material");
  const [materialInputNum, setMaterialInputNum] = useState<number>(1);
  const [materials, setMaterials] = useState<string[]>(Array(limitOfMaterialNum).fill(""));

  const materialState = {
    limitOfMaterialNum: limitOfMaterialNum,
    setWhichPage: setWhichPage,
    materialInputNum: materialInputNum,
    setMaterialInputNum: setMaterialInputNum,
    materials: materials,
    setMaterials: setMaterials,
  }

  const limitOfStepNum = 5;
  const [stepInputNum, setStepInputNum] = useState<number>(1);
  const [steps, setSteps] = useState<string[]>(Array(limitOfStepNum).fill(""));

  const stepState = {
    limitOfStepNum: limitOfStepNum,
    stepInputNum: stepInputNum,
    setStepInputNum: setStepInputNum,
    steps: steps,
    setSteps: setSteps
  }

  return (
    <>
    <div className={styles.fullpage}>
      <Header />
      {
        whichPage === "material" ? <Material states={materialState}/> : <Step states={stepState}/>
      }
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

interface MaterialProp {
  limitOfMaterialNum: number
  setWhichPage: (str: string) => void
  materialInputNum: number
  setMaterialInputNum: (n: number) => void
  materials: string[]
  setMaterials: (strary: string[]) => void
}

const Material = ({ states }) => {
  const state = states as MaterialProp;
  const SetInputtedMaterial = (idx: number, value: string) => {
    state.materials[idx] = value;
    state.setMaterials(state.materials);
  }

  const AddInput = () => {
    state.setMaterialInputNum(state.materialInputNum + 1);
  }

  return (
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <p>Register materials</p>
        <div className={styles.materialBox}>
          <h5 className={styles.description}>{`Please input material to use. Limit is ${state.limitOfMaterialNum}. Clicking a plus mark increases a text box.`}</h5>
          <p>Material</p>
          {
            [...Array(state.materialInputNum)].map((_, i) => 
              <Fragment key={i}>
              <div className={styles.materialInputBox}>
              <input
                onChange={(e) => SetInputtedMaterial(i, e.target.value)}
                className={styles.materialInput} 
                type="text">
              </input>
              {
                // +記号は最下部のみに表示する
                (state.materialInputNum === i + 1 && state.materialInputNum < state.limitOfMaterialNum)
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
          <h4 onClick={() => state.setWhichPage("aaa")}>To step</h4>
        </div>
      </div>
    </div>
  )
}

interface StepProp {
  limitOfStepNum: number
  stepInputNum: number
  setStepInputNum: (n: number) => void
  steps: string[]
  setSteps: (strary: string[]) => void
}

const Step = ({ states }) => {
  const state = states as StepProp;
  const SetInputtedStep = (idx: number, value: string) => {
    state.steps[idx] = value;
    state.setSteps(state.steps);
  }

  const AddInput = () => {
    state.setStepInputNum(state.stepInputNum + 1);
  }

  return (
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <p>Register steps</p>
        <div className={styles.materialBox}>
          <h5 className={styles.description}>{`Please input steps to cook. Limit is ${state.limitOfStepNum}. Clicking a plus mark increases a text box.`}</h5>
          <p>Step</p>
          {
            [...Array(state.stepInputNum)].map((_, i) => 
              <Fragment key={i}>
              <div className={styles.materialInputBox}>
              <input
                onChange={(e) => SetInputtedStep(i, e.target.value)}
                className={styles.materialInput} 
                type="text">
              </input>
              {
                // +記号は最下部のみに表示する
                (state.stepInputNum === i + 1 && state.stepInputNum < state.limitOfStepNum)
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
    </div>
  )
}