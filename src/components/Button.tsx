type ButtonProps = {
  children: React.ReactNode
  span?: number
  index?: number
}

function Button({ children, span, index }: ButtonProps) {
  return (
    <button
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
