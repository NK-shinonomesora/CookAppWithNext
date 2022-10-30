import { render, screen, RenderResult, renderHook, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { CookName, Material, RegisterProp, Step } from './register'

describe('CookName', () => {
  let renderResult: RenderResult;

  beforeAll(() => {
    renderResult = render(<CookName />);
  })

  afterAll(() => {
    renderResult.unmount();
  })

  test('When calling the SetInputtedCookName function, argument value is inputted to the cookName.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.SetInputtedCookName("okonomiyaki"));
    expect(result.current.cookName).toBe("okonomiyaki");
  })
})

describe('Material', () => {
  let renderResult: RenderResult;

  beforeAll(() => {
    renderResult = render(<Material />);
  })

  afterAll(() => {
    renderResult.unmount();
  })

  test('When calling the IncreaseMaterial function, increase the materialInputNum.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.IncreaseMaterial());
    expect(result.current.materialInputNum).toBe(2)
  })

  test('When calling the SetInputtedMaterial function, argument value is inputted to index in the materials.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.SetInputtedMaterial(1, "testValue"));
    expect(result.current.materials[1]).toBe("testValue");
  })
})

describe('Step', () => {
  let renderResult: RenderResult;

  beforeAll(() => {
    renderResult = render(<Step />);
  })

  afterAll(() => {
    renderResult.unmount();
  })

  test('When calling the IncreaseStep function, increase the stepInputNum.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.IncreaseStep());
    expect(result.current.stepInputNum).toBe(2)
  })

  test('When calling the SetInputtedStep function, argument value is inputted to index in the steps.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.SetInputtedStep(3, "testValue2"));
    expect(result.current.steps[3]).toBe("testValue2");
  })
})