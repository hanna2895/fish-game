export const BuyCard = ({ shells, buyCard, endTurn, setShowAvailableMoves, level1cards, level2cards, level3cards }) => {
    return (
      <div>
      {shells > 2 && level1cards > 0 && (
        <button onClick={() => buyCard(1)}>Buy Level 1 ({level1cards})</button>
      )}
      {shells > 7 && level2cards > 0 &&(
        <button onClick={() => buyCard(2)}>Buy Level 2 ({level2cards})</button>)}
      {shells > 12 && level3cards > 0 && (
        <button onClick={() => buyCard(3)}>Buy Level 3 ({level3cards})</button>)}
      <button
        onClick={() => {
          endTurn()
          setShowAvailableMoves(false)
        }}
      >
        End your turn
      </button>
    </div>
  )
}