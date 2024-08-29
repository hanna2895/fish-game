import React from "react"

const Table = ({ table, buyCard }) => {
  return (
    <div className="tableContainer">
      {table.map((card, index) => {
        const halfPrice = Math.round(card.price / 2)
        return (
          <div key={index} className="card centerCard">
            <div className="cardName">
              {card.name}</div>
            {card.price && <div>
              <button onClick={() => buyCard(card)}>
              Shells {halfPrice}
              </button>
              </div>}
          </div>
        )
      })}
    </div>
  )
}

export default Table
