import { startingDeck } from "./startingDeck"
import { useState } from "react"
import "./Base.css"
import { Level1 } from "./level1"

const Base = ({ player, turn, endTurn, table, setTable }) => {
  const [shells, setShells] = useState(0)
  const [corals, setCorals] = useState(0)
  const [tridents, setTridents] = useState(0)

  const [roll1, setRoll1] = useState(0)
  const [roll2, setRoll2] = useState(0)

  const [showAvailableMoves, setShowAvailableMoves] = useState(false)

  // your deck
  const [deck, setDeck] = useState([...startingDeck])

  const renderCard = (slot) => {
    const cards = deck.filter((card) => card.boardSlot === slot)

    const active = cards.find((card) => card.attack)
    const defense = cards.filter((card) => !card.attack)

    return (
      <div className="cardSlot" id={`card${slot}`}>
        {active && (
          <div className="card">
            <div className="cardName">{active.name}</div>
            {active.attackAction.shells && (
              <div>shell {active.attackAction.shells}</div>
            )}
            {active.attackAction.corals && (
              <div>corals {active.attackAction.corals}</div>
            )}
            {active.attackAction.tridents && (
              <div>tridents {active.attackAction.tridents}</div>
            )}
          </div>
        )}
        {defense.map((card) => (
          <div className="card cardDefense" key={card.name}>
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

  const renderCardForAttack = (slot) => {
    const cards = deck.filter((card) => card.boardSlot === slot)
    const active = cards.find((card) => card.attack)

    return (
      <div>
        {active && (
          <div className="cardAttack">
            {active.attackAction.shells && (
              <div>shell {active.attackAction.shells}</div>
            )}
            {active.attackAction.corals && (
              <div>corals {active.attackAction.corals}</div>
            )}
            {active.attackAction.tridents && (
              <div>tridents {active.attackAction.tridents}</div>
            )}
          </div>
        )}
      </div>
    )
  }

  const attack = (slot1, slot2) => {
    const card1 = deck.find((card) => card.boardSlot === slot1 && card.attack)
    const card2 = deck.find((card) => card.boardSlot === slot2 && card.attack)

    if (card2) {
      card2.attackAction.shells &&
        setShells(
          shells + card2.attackAction.shells + card1.attackAction.shells
        )
      card2.attackAction.corals &&
        setCorals(
          corals + card2.attackAction.corals + card1.attackAction.corals
        )
      card2.attackAction.tridents &&
        setTridents(
          tridents + card2.attackAction.tridents + card1.attackAction.tridents
        )
    } else {
      card1.attackAction.shells &&
        setShells(shells + card1.attackAction.shells)
      card1.attackAction.corals &&
        setCorals(corals + card1.attackAction.corals)
      card1.attackAction.tridents &&
        setTridents(tridents + card1.attackAction.tridents)
    }

    setRoll1(0)
    setRoll2(0)

    setShowAvailableMoves(true)
  };

  const roll = () => {
    setRoll1(Math.floor(Math.random() * 6) + 1)
    setRoll2(Math.floor(Math.random() * 6) + 1)
  };

  const buyCard = (level) => {
    if (level === 1) {
      // get a random card from level 1
      const card = Level1[Math.floor(Math.random() * Level1.length)]

      //update on buyCard function to update properly and prevent errors
      // check if you have enough shells to buy the card
      if (card.price <= shells) {
        setDeck((prevDeck) => {
          // create a new deck without the purchased card
          let newDeck = prevDeck.filter((c) => c.name !== card.name)

          // find the card in your deck at that level and set the attack to false
          const existingCard = newDeck.find(
            (c) => card.boardSlot === c.boardSlot
          )
          if (existingCard) {
            existingCard.attack = false
          }
          setShells(0 + corals)
          card.attack = true
          newDeck.push(card)
          return newDeck
        })
      } else {
        setTable((prevTable) => [...prevTable, card])
      }
      card.attack = true
      deck.push(card)
    }
  }

  return (
    <div>
      <h1>{player}'s Base </h1>
      <div className="shells">Shells: {shells}</div>
      <div className="coral">Corals: {corals}</div>
      <div className="tridents">Tridents: {tridents}</div>

      {turn ? (
        <>
          {showAvailableMoves ? (
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
          ) : (
            <div className="rollContainer">
              {!(roll1 && roll2) ? (
                <button onClick={() => roll()}>Roll</button>
              ) : (
                <>
                  <div className="splitContainer">
                    <div className="split">
                      <div className="die">{roll1}</div>
                      <div className="die">{roll2}</div>
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
          )}
        </>
      ) : (
        <div>Not your turn</div>
      )}

      <div className="base">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((slot) =>
          renderCard(slot)
        )}
      </div>
    </div>
  )
}

export default Base
