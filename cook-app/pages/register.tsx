import type { NextPage } from 'next'
import styles from '../styles/register.module.css'
import { Fragment, useState, createContext, useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface RegisterStateProp {
  limitOfMaterialNum: number
  setWhichPage: (str: string) => void
  materialInputNum: number
  setMaterialInputNum: (n: number) => void
  Increase: () => void
  materials: string[]
  setMaterials: (strary: string[]) => void
  limitOfStepNum: number
  stepInputNum: number
  setStepInputNum: (n: number) => void
  steps: string[]
  setSteps: (strary: string[]) => void
}

const RegisterContext = createContext<RegisterStateProp | null>(null);

export const RegisterProp = () => {
  const limitOfMaterialNum = 10;
  const [whichPage, setWhichPage] = useState<string>("material");
  const [materialInputNum, setMaterialInputNum] = useState<number>(1);
  const [materials, setMaterials] = useState<string[]>(Array(limitOfMaterialNum).fill(""));
  const limitOfStepNum = 5;
  const [stepInputNum, setStepInputNum] = useState<number>(1);
  const [steps, setSteps] = useState<string[]>(Array(limitOfStepNum).fill(""));

  const Increase = () => {
    setMaterialInputNum((materialInputNum) => materialInputNum + 1)
  }

  return {
    limitOfMaterialNum: limitOfMaterialNum,
    whichPage: whichPage,
    setWhichPage: setWhichPage,
    materialInputNum: materialInputNum,
    setMaterialInputNum: setMaterialInputNum,
    Increase: Increase,
    materials: materials,
    setMaterials: setMaterials,
    limitOfStepNum: limitOfStepNum,
    stepInputNum: stepInputNum,
    setStepInputNum: setStepInputNum,
    steps: steps,
    setSteps: setSteps
  }
}

const Register: NextPage = () => {

  const registerState = RegisterProp();

  return (
    <>
    <RegisterContext.Provider value={registerState}>
      <div className={styles.fullpage}>
        <Header />
        {
          registerState.whichPage === "material" ? <Material /> : <Step />
        }
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

interface MaterialProp {
  limitOfMaterialNum: number
  materialInputNum: number
  setMaterialInputNum: (n: number) => void
  Increase: () => void
  materials: string[]
  setMaterials: (strary: string[]) => void
  setWhichPage: (str: string) => void
  SetInputtedMaterial: (idx: number, value: string) => void
}

export const MaterialProp = (): MaterialProp | null => {
  const registerContext = useContext(RegisterContext);
  if(!registerContext) return null;
  const { limitOfMaterialNum, materialInputNum, setMaterialInputNum, Increase, materials, setMaterials, setWhichPage } = registerContext;

  const SetInputtedMaterial = (idx: number, value: string) => {
    materials[idx] = value;
    setMaterials(materials);
  }

  return {
    limitOfMaterialNum: limitOfMaterialNum,
    materialInputNum: materialInputNum,
    setMaterialInputNum: setMaterialInputNum,
    Increase: Increase,
    materials: materials,
    setMaterials: setMaterials,
    setWhichPage: setWhichPage,
    SetInputtedMaterial: SetInputtedMaterial,
  }

}

export const Material = () => {
  const  materialProp = MaterialProp();
  if(!materialProp) return null;
  const { limitOfMaterialNum, materialInputNum, setWhichPage, SetInputtedMaterial, Increase } = materialProp;

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
                  onClick={() => Increase()}
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
          <h4 onClick={() => setWhichPage("aaa")}>To step</h4>
        </div>
      </div>
    </div>
  )
}

const Step = () => {
  const registerContext = useContext(RegisterContext);
  const { limitOfStepNum, steps, setSteps, stepInputNum, setStepInputNum } = registerContext!;

  const SetInputtedStep = (idx: number, value: string) => {
    steps[idx] = value;
    setSteps(steps);
  }

  const AddInput = () => {
    setStepInputNum(stepInputNum + 1);
  }

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