import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from '../styles/register.module.css'
import { Fragment, useState, createContext, useContext, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface RegisterStateProp {
  cookName: string
  setCookName: (str: string) => void
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
  GetAllCooks: () => void
  CreateMaterials: () => void
  SetInputtedCookName: (value: string) => void
  whichPage: boolean
  setWhichPage: (flag: boolean) => void
}

const RegisterContext = createContext<RegisterStateProp | null>(null);

export const RegisterProp = () => {
  const [cookName, setCookName] = useState<string>("");
  const limitOfMaterialNum = 10;
  const [materialInputNum, setMaterialInputNum] = useState<number>(1);
  const [materials, setMaterials] = useState<string[]>(Array(limitOfMaterialNum).fill(""));
  const limitOfStepNum = 5;
  const [stepInputNum, setStepInputNum] = useState<number>(1);
  const [steps, setSteps] = useState<string[]>(Array(limitOfStepNum).fill(""));
  const [whichPage, setWhichPage]= useState<boolean>(true);

  const SetInputtedCookName = (value: string) => {
    setCookName(value);
  }

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

  const GetAllCooks = async () => {
    const res = await fetch('http://127.0.0.1:4000/cook');
    const cooks = await res.json();
    console.log(cooks[0]);
  }

  const CheckInputState = (): boolean => {
    if(cookName === "") return false;
    if(materials.every(value => value === "")) return false;
    if(steps.every(value => value === "")) return false;
    return true;
  }

  const CreateMaterials = async () => {
    if(!CheckInputState()){
      const element = document.getElementById("errorMessage");
      if(element) {
        element.style.display = "block";
      }
      return;
    }
    try {
      const res = await fetch('http://127.0.0.1:4000/cook_and_material_and_step', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cookName: cookName, materials: materials, steps: steps })
        })
      if(res.ok) {
        setWhichPage((whichPage) => !whichPage);
      } else {
        alert("Error occures in server. Please try again.");
      }
    } catch(err) {
      console.log(err);
    }
  }

  return {
    cookName: cookName,
    setCookName: setCookName,
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
    GetAllCooks: GetAllCooks,
    CreateMaterials: CreateMaterials,
    SetInputtedCookName: SetInputtedCookName,
    whichPage: whichPage,
    setWhichPage: setWhichPage
  }
}

const Register: NextPage = () => {
  const registerState = RegisterProp();
  const { whichPage } = registerState;

  return (
    <>
    <RegisterContext.Provider value={registerState}>
      <div className={styles.fullpage}>
        {
          whichPage
          ?
          <>
          <Header />
          <CookName />
          <Material />
          <Step />
          </>
          :
          <AfterRegister />
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

export const CookName = () => {
  const registerContext = useContext(RegisterContext);
  if(!registerContext) return null;
  const { SetInputtedCookName } = registerContext;

  return (
    <>
    <div className={styles.flex}>
      <div className={styles.wrap}>
        <p>Register cook name</p>
        <div className={styles.materialBox}>
          <h5 className={styles.description}>{`Please input cook name.`}</h5>
          <p>Cook Name</p>
            <div className={styles.materialInputBox}>
              <input
                onChange={(e) => SetInputtedCookName(e.target.value)}
                className={styles.materialInput} 
                type="text">
              </input>
            </div>
        </div>
      </div>
    </div>
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
  const { limitOfStepNum, stepInputNum, SetInputtedStep, IncreaseStep, CreateMaterials } = registerContext!;

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
        <h6 id="errorMessage" className={styles.errorMessage}>Each content must be inputted at least one.</h6>
      </div>
      <div className={styles.wrap}>
        <div className={styles.toStepBox}>
          <h4 onClick={() => CreateMaterials()}>Register</h4>
        </div>
      </div>
    </div>
  )
}

const AfterRegister = () => {
  window.scroll({top: 0, behavior: 'auto'});
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("");
        }, 3000);
      })
      router.push('./homepage');
    })();
  }, [])

  return (
    <div id="afterRegister" className={styles.afterRegister}>
      <div className={styles.afterRegisterInner}>
        <p>Registration completed. Jump to Home Page.</p>
      </div>
    </div>
  )
}