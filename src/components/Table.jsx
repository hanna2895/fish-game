import React from "react"

const Table = ({ table }) => {
  return (
    <div className="tableContainer">
      {table.map((card, index) => {
        const halfPrice = Math.round(card.price / 2)
        return (
          <div key={index} className="card centerCard">
            <div className="cardName">{card.name}</div>
            {card.price && <div>Price: {halfPrice}</div>}
          </div>
        )
      })}
    </div>
  )
}

export default Table
