import { ACTIONS } from "../App"

type ButtonProps = {
  children: React.ReactNode
  span?: number
  dispatch: React.Dispatch<{ type: string; payload: { number?: string } }>
}

function Button({ children, span, dispatch }: ButtonProps) {
  function dispatchAction() {
    switch (children) {
      case "AC":
        dispatch({ type: ACTIONS.CLEAR })
    }
  }

  return (
    <button
      onClick={dispatchAction}
      className={`bg-zinc-500 p-6 font-bold transition-all hover:brightness-75 active:shadow-inner active:shadow-black col-span-${span} `}
    >
      {children}
    </button>
  )
}

export default Button
