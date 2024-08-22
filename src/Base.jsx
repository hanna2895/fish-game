import { startingDeck } from "./startingDeck"
import { useState } from "react"
import "./Base.css"
import { Level1 } from "./level1"
import { RollDice } from "./components/RollDice"
import { BuyCard } from "./components/BuyCard"
import { CardSlot } from "./components/CardSlot"
import { DefensePile } from "./components/DefensePile"
import { DefenseCardSlot } from "./components/DefenseCardSlot"

const Base = ({ player, turn, endTurn, table, setTable }) => {
  const [shells, setShells] = useState(0)
  const [corals, setCorals] = useState(0)
  const [tridents, setTridents] = useState(0)

  const [defenseStack, setDefenseStack] = useState([])
  const [totalShellsDefense, setTotalShellsDefense] = useState(0)
  const [totalCoralsDefense, setTotalCoralsDefense] = useState(0)
  const [totalTridentsDefense, setTotalTridentsDefense] = useState(0)

  const [roll1, setRoll1] = useState(0)
  const [roll2, setRoll2] = useState(0)

  const [showAvailableMoves, setShowAvailableMoves] = useState(false)

  // your deck
  const [deck, setDeck] = useState([...startingDeck])


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

  //Create a defense Stack of cards

  const addToDefenseStack = (card) => {
    setDefenseStack((prevStack) => {
      const newStack = [...prevStack, card]
      updateDefenseStackTotal(newStack)
      return newStack
    })
  }

  const updateDefenseStackTotal = (newStack) => {
    const totalShells = newStack.reduce((total, card) => total + (card.defenseAction.shells || 0), 0)
    const totalCorals = newStack.reduce((total, card) => total + (card.defenseAction.corals || 0), 0)
    const totalTridents = newStack.reduce((total, card) => total + (card.defenseAction.tridents || 0), 0)

    setTotalShellsDefense(totalShells)
    setTotalCoralsDefense(totalCorals)
    setTotalTridentsDefense(totalTridents)
  }

  const handleEndTurn = () => {
    setShells(corals);
    endTurn();
  };


  const buyCard = (level) => {

    if (level === 1) {
      // Get a random card from level 1
      const card = Level1[Math.floor(Math.random() * Level1.length)]
            // Check if you have enough shells to buy the card
      if (card.price <= shells) {
        setDeck((prevDeck) => {
          // going through the deck, adding the card on the current board slot to the defense pile
          let newDeck = prevDeck.filter(c => {
            if (c.boardSlot === card.boardSlot) {
              // Move the replaced card to the defense stack
              addToDefenseStack({ ...c, attack: false }); 
              return false
            }
            return true;
          });

          newDeck = newDeck.filter(c => c.name !== card.name)
  
          card.attack = true
          newDeck.push(card)
          setShells(0)
          return newDeck
        })
      } else {
        setTable((prevTable) => [...prevTable, card])
      }
    }
  }

  return (
    <div>
      <div className="playersStats">
      <div className="player">
        <h1>{player}'s Base </h1>
        <div className="shells">Shells: {shells}</div>
        <div className="coral">Corals: {corals}</div>
        <div className="tridents">Tridents: {tridents}</div>
      </div>

      <div className="defense">
        <DefensePile
          totalShellsDefense={totalShellsDefense}
          totalCoralsDefense={totalCoralsDefense}
          totalTridentsDefense={totalTridentsDefense}
          />
      </div>

      </div>
      {turn ? (
        <>
          {showAvailableMoves ? (
            <div className="buyingContainer">

            <BuyCard 
              shells={shells}
              buyCard={buyCard}
              setShowAvailableMoves={setShowAvailableMoves}
              endTurn={handleEndTurn}
              />
          </div>
          ) : (
            <RollDice
              roll1={roll1}
              roll2={roll2}
              roll={roll}
              attack={attack}
              renderCardForAttack={renderCardForAttack}
            />
          )}
        </>
      ) : (
        <div>Not your turn</div>
      )}

      <div className="base">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((slot) =>
          <CardSlot key={slot} slot={slot} cards={deck.filter((card) => card.boardSlot === slot)} />
        )}
      </div>
      <div className="base">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((slot) => (
          <DefenseCardSlot key={slot} slot={slot} cards={defenseStack.filter((card) => card.boardSlot === slot)} />
        ))}
      </div>
    </div>
  )
}

export default Base
