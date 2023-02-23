import { ACTIONS } from "../App"

type ButtonProps = {
  children: React.ReactNode
  span?: boolean
  dispatch: React.Dispatch<{ type: string }>
}

function Button({ children, span, dispatch }: ButtonProps) {
  function dispatchAction() {
    switch (children) {
      case "AC":
        dispatch({ type: ACTIONS.CLEAR })
      case "DEL":
        dispatch({ type: ACTIONS.DELETE_DIGIT })
      case "=":
        dispatch({ type: ACTIONS.EVALUATE })
    }
  }

  return (
    <button
      onClick={dispatchAction}
      className={`bg-zinc-500 p-2 font-bold transition-all hover:brightness-75 active:shadow-inner active:shadow-black ${
        span && "col-span-2"
      }`}
    >
      {children}
    </button>
  )
}

export default Button
