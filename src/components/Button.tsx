import { ACTIONS } from "../App"

type ButtonProps = {
  children: React.ReactNode
  span?: number
  index?: number
  number?: string
  dispatch: React.Dispatch<{ type: string; payload: { number?: string } }>
}

function Button({ children, span, index, number, dispatch }: ButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { number } })}
      className={`bg-zinc-500 p-6 font-bold transition-all hover:brightness-75 active:shadow-inner active:shadow-black col-span-${span} 
      ${
        index &&
        (index < 3
          ? "row-start-2"
          : index < 6
          ? "row-start-3"
          : index < 9 && "row-start-4")
      }`}
    >
      {children}
    </button>
  )
}

export default Button
