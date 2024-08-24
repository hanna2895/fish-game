export const RollDice = ({
  roll1,
  roll2,
  roll,
  attack,
  renderCardForAttack,
  pearls,
}) => {
  return (
    <div className="rollContainer">
      {!(roll1 && roll2) ? (
        <button onClick={() => roll()}>Roll</button>
      ) : (
        <>
          {pearls && <div className="rerolling">
            <button onClick={() => roll()}>ReRoll Both</button>
          </div>}
          <div className="splitContainer">
            <div className="split">
              <div className="die">
                {pearls && <div className="rerolling">
                  <button>ReRoll</button>
                </div>}
                {roll1}
              </div>
              <div className="die">
                {pearls && <div className="rerolling">
                  <button>ReRoll</button>
                </div>}
                {roll2}
              </div>
            </div>
            <div className="splitRewards">
              {renderCardForAttack(roll1)}
              {renderCardForAttack(roll2)}
            </div>
            <button
              onClick={() => {
                attack(roll1, roll2)
              }}
            >
              Split
            </button>
          </div>
          {/* stuff you get */}

          <div className="totalContainer">
            <div className="dice">{roll1 + roll2}</div>
            <div className="totalRewards">
              {renderCardForAttack(roll1 + roll2)}
            </div>
            <button onClick={() => attack(roll1 + roll2)}>Total</button>
          </div>
        </>
      )}
    </div>
  )
}
