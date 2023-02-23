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

interface State {
  overwrite?: boolean
  currentOperand?: string | null
  previousOperand?: string | null
  operation?: string | null
}

interface Action {
  type: string
  payload: {
    digit?: string
    operation?: string
  }
}

function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.currentOperand) {
        return state
      }
      if (!state.currentOperand && !state.previousOperand) {
        return state
      }
      if (!state.previousOperand) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite || !state.currentOperand) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (!state.operation || !state.currentOperand || !state.previousOperand) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
      }
  }
  return state
}

function evaluate({ currentOperand, previousOperand, operation }: State) {
  const prev = parseFloat(previousOperand!)
  const current = parseFloat(currentOperand!)
  if (isNaN(prev) || isNaN(current)) {
    return ""
  }
  let calculation
  switch (operation) {
    case "+":
      calculation = prev + current
      break
    case "-":
      calculation = prev - current
      break
    case "×":
      calculation = prev * current
      break
    case "÷":
      calculation = prev / current
      break
  }
  return calculation?.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand: string) {
  if (operand == null) {
    return
  }
  const [integer, decimal] = operand.split(".")
  if (decimal == null) {
    return INTEGER_FORMATTER.format(Number(integer))
  }
  return `${INTEGER_FORMATTER.format(Number(integer))}.${decimal}`
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
      <div className="w-80 sm:w-96">
        <div className="h-28 w-full overflow-clip bg-zinc-900 px-4 py-8 text-right">
          <p>
            {formatOperand(previousOperand!)}
            <span>{operation}</span>
          </p>
          <p className="text-lg font-bold sm:text-2xl">
            {formatOperand(currentOperand!)}
          </p>
        </div>
        <div className="grid w-full grid-cols-4 gap-px">
          <Button dispatch={dispatch} span>
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
          <Button dispatch={dispatch} span>
            =
          </Button>
        </div>
        <p className="text-center font-bold">
          Created by{" "}
          <a
            href="https://github.com/zwiro"
            className="underline hover:text-blue-300"
          >
            zwiro
          </a>
        </p>
      </div>
    </main>
  )
}

export default App
