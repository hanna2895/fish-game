export const BuyCard = ({ shells, buyCard, endTurn, setShowAvailableMoves }) => {
    return (
      <div>
      {shells > 2 && (
        <button onClick={() => buyCard(1)}>Buy Level 1</button>
      )}
      {shells > 7 && <button>Buy Level 2</button>}
      {shells > 12 && <button>Buy Level 3</button>}
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