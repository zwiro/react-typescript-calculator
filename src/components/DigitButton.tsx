import { useEffect, useState } from "react"
import { ACTIONS } from "../App"

type DigitButtonProps = {
  digit: string
  dispatch: React.Dispatch<any>
}

function DigitButton({ digit, dispatch }: DigitButtonProps) {
  const [digitRow, setDigitRow] = useState("")

  useEffect(() => {
    switch (digit) {
      case "1":
      case "2":
      case "3":
        return setDigitRow("row-start-2")
      case "4":
      case "5":
      case "6":
        return setDigitRow("row-start-3")
      case "7":
      case "8":
      case "9":
        return setDigitRow("row-start-4")
      case ".":
        return setDigitRow("row-start-5")
    }
  }, [])

  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className={`bg-zinc-500 p-6 font-bold transition-all hover:brightness-75 active:shadow-inner active:shadow-black ${digitRow}`}
    >
      {digit}
    </button>
  )
}

export default DigitButton
