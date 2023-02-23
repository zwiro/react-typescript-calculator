import { ACTIONS } from "../App"

type DigitButtonProps = {
  children: React.ReactNode
  index?: number
  digit?: string
  dispatch: React.Dispatch<{ type: string; payload: { digit?: string } }>
}

function DigitButton({ digit, dispatch }: DigitButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className={`bg-zinc-500 p-6 font-bold transition-all hover:brightness-75 active:shadow-inner active:shadow-black 
      ${""}`}
    >
      {digit}
    </button>
  )
}

export default DigitButton
