import { render, screen, RenderResult, renderHook, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Register, { Material, MaterialProp, RegisterProp } from './register'

describe('Material', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<Material />)
  })

  afterEach(() => {
    renderResult.unmount()
  })

  test('When clicking a plus mark, increase materialInputNum.', () => {
    const { result } = renderHook(() => RegisterProp());
    const plusmark = screen.getByTestId('plusmark') as HTMLElement
    userEvent.click(plusmark)
    expect(result.current.materialInputNum).toBe(2)
  })
})