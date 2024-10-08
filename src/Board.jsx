import Base from "./Base"
import Table from "./components/Table"
import { useState } from "react"

const Board = () => {
  const [turn, setTurn] = useState(1)

  const [table, setTable] = useState([])

  return (
    <div>
      <Table table={table} />
      {turn === 1 ? (
        <Base
          player="Player 1"
          turn={turn === 1}
          table={table}
          setTable={setTable}
          endTurn={() => {
            setTurn(2)
          }}
        />
      ) : (
        <Base
          player="Player 2"
          turn={turn === 2}
          table={table}
          setTable={setTable}
          endTurn={() => {
            setTurn(1)
          }}
        />
      )}
  
    </div>
  )
}
export default Board
