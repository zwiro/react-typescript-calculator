import { ACTIONS } from "../App"

type OperationButtonProps = {
  operation: string
  dispatch: React.Dispatch<any>
}

function OperationButton({ operation, dispatch }: OperationButtonProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
      className="bg-zinc-500 p-6 font-bold transition-all hover:brightness-75 active:shadow-inner active:shadow-black"
    >
      {operation}
    </button>
  )
}

export default OperationButton
