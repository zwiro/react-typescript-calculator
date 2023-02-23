import Button from "./Button"

function App() {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"]
  return (
    <main className="grid h-screen place-items-center">
      <div className="w-1/2">
        <div className="w-full bg-zinc-900 p-4 text-right">
          <p>
            5322 <span>*</span>
          </p>
          <p className="text-2xl font-bold">5555</p>
        </div>
        <div className="grid w-full grid-cols-4 grid-rows-5 gap-px">
          <Button span={2}>AC</Button>
          <Button>DEL</Button>
          <Button>&divide;</Button>
          <Button>&times;</Button>
          <Button>+</Button>
          <Button>-</Button>
          {numbers.map((number, i) => (
            <Button key={`${number}-${i}`} index={i}>
              {number}
            </Button>
          ))}
          <Button span={2}>=</Button>
        </div>
      </div>
    </main>
  )
}

export default App
