import type { NextPage } from 'next'
import styles from '../styles/register.module.css'
import { Fragment, useState, createContext, useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface RegisterStateProp {
  limitOfMaterialNum: number
  materialInputNum: number
  setMaterialInputNum: (n: number) => void
  IncreaseMaterial: () => void
  materials: string[]
  setMaterials: (strary: string[]) => void
  limitOfStepNum: number
  stepInputNum: number
  setStepInputNum: (n: number) => void
  steps: string[]
  setSteps: (strary: string[]) => void
  SetInputtedMaterial: (idx: number, value: string) => void
  SetInputtedStep: (idx: number, value: string) => void
  IncreaseStep: () => void
}

const RegisterContext = createContext<RegisterStateProp | null>(null);

export const RegisterProp = () => {
  const limitOfMaterialNum = 10;
  const [materialInputNum, setMaterialInputNum] = useState<number>(1);
  const [materials, setMaterials] = useState<string[]>(Array(limitOfMaterialNum).fill(""));
  const limitOfStepNum = 5;
  const [stepInputNum, setStepInputNum] = useState<number>(1);
  const [steps, setSteps] = useState<string[]>(Array(limitOfStepNum).fill(""));

  const IncreaseMaterial = () => {
    setMaterialInputNum((materialInputNum) => materialInputNum + 1)
  }

  const SetInputtedMaterial = (idx: number, value: string) => {
    materials[idx] = value;
    setMaterials(materials);
  }

  const SetInputtedStep = (idx: number, value: string) => {
    steps[idx] = value;
    setSteps(steps);
  }

  const IncreaseStep = () => {
    setStepInputNum((stepInputNum) => stepInputNum + 1);
  }

  return {
    limitOfMaterialNum: limitOfMaterialNum,
    materialInputNum: materialInputNum,
    setMaterialInputNum: setMaterialInputNum,
    IncreaseMaterial: IncreaseMaterial,
    materials: materials,
    setMaterials: setMaterials,
    limitOfStepNum: limitOfStepNum,
    stepInputNum: stepInputNum,
    setStepInputNum: setStepInputNum,
    steps: steps,
    setSteps: setSteps,
    SetInputtedMaterial: SetInputtedMaterial,
    SetInputtedStep: SetInputtedStep,
    IncreaseStep: IncreaseStep,
  }
}

const Register: NextPage = () => {
  const registerState = RegisterProp();

  return (
    <>
    <RegisterContext.Provider value={registerState}>
      <div className={styles.fullpage}>
        <Header />
        <Material />
        <Step />
      </div>
    </RegisterContext.Provider>
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

export const Material = () => {
  const registerContext = useContext(RegisterContext);
  if(!registerContext) return null;
  const { limitOfMaterialNum, materialInputNum, SetInputtedMaterial, IncreaseMaterial } = registerContext;

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
                  data-testid="plusmark"
                  onClick={() => IncreaseMaterial()}
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

export const Step = () => {
  const registerContext = useContext(RegisterContext);
  if(!registerContext) return null;
  const { limitOfStepNum, stepInputNum, SetInputtedStep, IncreaseStep } = registerContext!;

  return (
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <p>Register steps</p>
        <div className={styles.materialBox}>
          <h5 className={styles.description}>{`Please input steps to cook. Limit is ${limitOfStepNum}. Clicking a plus mark increases a text box.`}</h5>
          <p>Step</p>
          {
            [...Array(stepInputNum)].map((_, i) => 
              <Fragment key={i}>
              <div className={styles.materialInputBox}>
              <input
                onChange={(e) => SetInputtedStep(i, e.target.value)}
                className={styles.materialInput} 
                type="text">
              </input>
              {
                // +記号は最下部のみに表示する
                (stepInputNum === i + 1 && stepInputNum < limitOfStepNum)
                &&
                <AiOutlinePlus
                  onClick={() => IncreaseStep()}
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
          <h4 onClick={() => ""}>Register</h4>
        </div>
      </div>
    </div>
  )
}