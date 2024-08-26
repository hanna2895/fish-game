export const DefenseCardSlot = ({ slot, cards }) => {
  const totalShells = cards.reduce((total, card) => total + (card.defenseAction.shells || 0), 0)
  const totalCorals = cards.reduce((total, card) => total + (card.defenseAction.corals || 0), 0)
  const totalTridents = cards.reduce((total, card) => total + (card.defenseAction.tridents || 0), 0)
  const totalPearls = cards.reduce((total, card) => total + (card.defenseAction.pearls || 0), 0)

  return (
    <div className="cardSlot" id={`defenseCard${slot}`}>
        <div className="card cardDefense">
          <div className="cardName">Defense Card{cards.length !== 1 ? 's' : ''} {cards.length}</div>
          {totalShells > 0 && <div>shells {totalShells}</div>}
          {totalCorals > 0 && <div>shells {totalCorals}</div>}
          {totalTridents > 0 && <div>shells {totalTridents}</div>}
          {totalPearls > 0 && <div>shells {totalPearls}</div>}
        </div>
    </div>
  )
}
