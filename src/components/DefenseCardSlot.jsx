export const DefenseCardSlot = ({ slot, cards }) => {
  return (
    <div className="cardSlot" id={`defenseCard${slot}`}>
      {cards.map((card, index) => (
        <div className="card cardDefense" key={index}>
          <div className="cardName">{card.name}</div>
          {card.defenseAction.shells && (
            <div>shell {card.defenseAction.shells}</div>
          )}
          {card.defenseAction.corals && (
            <div>corals {card.defenseAction.corals}</div>
          )}
          {card.defenseAction.tridents && (
            <div>tridents {card.defenseAction.tridents}</div>
          )}
        </div>
      ))}
    </div>
  )
}
