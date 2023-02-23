import { useReducer } from "react"
import Button from "./components/Button"
import DigitButton from "./components/DigitButton"
import OperationButton from "./components/OperationButton"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {}
  }
}

function App() {
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"]
  const operations = ["÷", "×", "+", "-"]
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <main className="grid h-screen place-items-center">
      <div className="w-1/2">
        <div className="h-28 w-full bg-zinc-900 px-4 py-8 text-right">
          <p>
            {previousOperand}
            <span>{operation}</span>
          </p>
          <p className="text-2xl font-bold">{currentOperand}</p>
        </div>
        <div className="grid w-full grid-cols-4 gap-px">
          <Button dispatch={dispatch} span={2}>
            AC
          </Button>
          <Button dispatch={dispatch}>DEL</Button>
          {operations.map((operation, i) => (
            <OperationButton
              key={`${operation}-${i}`}
              dispatch={dispatch}
              operation={operation}
            />
          ))}
          {digits.map((digit, i) => (
            <DigitButton
              key={`${digit}-${i}`}
              digit={digit}
              dispatch={dispatch}
            />
          ))}
          <Button dispatch={dispatch} span={2}>
            =
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App
