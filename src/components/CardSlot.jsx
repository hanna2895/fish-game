export const CardSlot = ({ slot, cards }) => {
  const active = cards.find((card) => card.attack)

  return (
    <div className="cardSlot" id={`card${slot}`}>
      {active && (
        <div className="card">
          <div className="cardName">{active.name}</div>
          {active.attackAction.shells && (
            <div>shells {active.attackAction.shells}</div>
          )}
          {active.attackAction.corals && (
            <div>corals {active.attackAction.corals}</div>
          )}
          {active.attackAction.tridents && (
            <div>tridents {active.attackAction.tridents}</div>
          )}
          {active.attackAction.pearls && (
            <div>pearls {active.attackAction.pearls}</div>
          )}
        </div>
      )}
    </div>
  )
}
