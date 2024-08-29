import { startingDeck } from "./startingDeck"
import { useState } from "react"
import "./Base.css"
import { Level1 } from "./level1"
import { Level2 } from "./level2"
import { Level3 } from "./level3"
import { RollDice } from "./components/RollDice"
import { BuyCard } from "./components/BuyCard"
import { CardSlot } from "./components/CardSlot"
import { DefenseCardSlot } from "./components/DefenseCardSlot"

const Base = ({ player, turn, endTurn, table, setTable }) => {
  const [shells, setShells] = useState(0)
  const [corals, setCorals] = useState(0)
  const [tridents, setTridents] = useState(0)
  const [pearls, setPearls] = useState(0)
  const [level1Cards, setLevel1Cards] = useState([...Level1])
  const [level2Cards, setLevel2Cards] = useState([...Level2])
  const [level3Cards, setLevel3Cards] = useState([...Level3])

  const [defenseStack, setDefenseStack] = useState([])
  const [totalShellsDefense, setTotalShellsDefense] = useState(0)
  const [totalCoralsDefense, setTotalCoralsDefense] = useState(0)
  const [totalTridentsDefense, setTotalTridentsDefense] = useState(0)
  const [totalPearlsDefense, setTotalPearlsDefense] = useState(0)

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
            {active.attackAction.pearls && (
              <div>Pearls {active.attackAction.pearls}</div>
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
      if (card2.attackAction.shells || card1.attackAction.shells) {
        setShells(shells + (card2.attackAction.shells || 0) + (card1.attackAction.shells || 0));
      }
      if (card2.attackAction.corals || card1.attackAction.corals) {
        setCorals(corals + (card2.attackAction.corals || 0) + (card1.attackAction.corals || 0));
      }
      if (card2.attackAction.tridents || card1.attackAction.tridents) {
        setTridents(tridents + (card2.attackAction.tridents || 0) + (card1.attackAction.tridents || 0));
      }
      if (card2.attackAction.pearls || card1.attackAction.pearls) {
        setPearls(pearls + (card2.attackAction.pearls || 0) + (card1.attackAction.pearls || 0));
      }
    } else {
      if (card1.attackAction.shells) setShells(shells + card1.attackAction.shells);
      if (card1.attackAction.corals) setCorals(corals + card1.attackAction.corals);
      if (card1.attackAction.tridents) setTridents(tridents + card1.attackAction.tridents);
      if (card1.attackAction.pearls) setPearls(pearls + card1.attackAction.pearls);
    }

    setRoll1(0)
    setRoll2(0)

    setShowAvailableMoves(true)
  }

  const roll = () => {
    setRoll1(Math.floor(Math.random() * 6) + 1)
    setRoll2(Math.floor(Math.random() * 6) + 1)
  }

  //Create a defense Stack of cards

  const addToDefenseStack = (card) => {
    setDefenseStack((prevStack) => {
      const newStack = [...prevStack, card]
      updateDefenseStackTotal(newStack)
      return newStack
    })
  }

  const updateDefenseStackTotal = (newStack) => {
    const totalShells = newStack.reduce(
      (total, card) => total + (card.defenseAction.shells || 0),
      0
    )
    const totalCorals = newStack.reduce(
      (total, card) => total + (card.defenseAction.corals || 0),
      0
    )
    const totalTridents = newStack.reduce(
      (total, card) => total + (card.defenseAction.tridents || 0),
      0
    )
    const totalPearls = newStack.reduce(
      (total, card) => total + (card.defenseAction.pearls || 0),
      0
    )

    setTotalShellsDefense(totalShells)
    setTotalCoralsDefense(totalCorals)
    setTotalTridentsDefense(totalTridents)
    setTotalPearlsDefense(totalPearls)
  }

  const renderCardForDefense = (slot) => {
    const cards = defenseStack.filter((card) => card.boardSlot === slot);
    const totalShells = cards.reduce(
      (total, card) => total + (card.defenseAction.shells || 0),
      0
    );
    const totalCorals = cards.reduce(
      (total, card) => total + (card.defenseAction.corals || 0),
      0
    );
    const totalTridents = cards.reduce(
      (total, card) => total + (card.defenseAction.tridents || 0),
      0
    );
    const totalPearls = cards.reduce(
      (total, card) => total + (card.defenseAction.pearls || 0),
      0
    );
  
    return (
      <div className="cardDefense">
        {totalShells > 0 && <div>Shells: {totalShells}</div>}
        {totalCorals > 0 && <div>Corals: {totalCorals}</div>}
        {totalTridents > 0 && <div>Tridents: {totalTridents}</div>}
        {totalPearls > 0 && <div>Pearls: {totalPearls}</div>}
      </div>
    );
  };

  const handleEndTurn = () => {
    if (shells < corals) {
      setShells(corals)
    }
    endTurn()
  }

  // Inside the Base component, before the return statement:

const handleDefenseRewards = (choice) => {
  // Assuming we want to add the defense rewards to a player's resources
  const totalShells = defenseStack.reduce(
    (total, card) =>
      card.boardSlot === choice ? total + (card.defenseAction.shells || 0) : total,
    0
  );
  const totalCorals = defenseStack.reduce(
    (total, card) =>
      card.boardSlot === choice ? total + (card.defenseAction.corals || 0) : total,
    0
  );
  const totalTridents = defenseStack.reduce(
    (total, card) =>
      card.boardSlot === choice ? total + (card.defenseAction.tridents || 0) : total,
    0
  );
  const totalPearls = defenseStack.reduce(
    (total, card) =>
      card.boardSlot === choice ? total + (card.defenseAction.pearls || 0) : total,
    0
  );

  // Update state with new defense rewards
  setShells((prevShells) => prevShells + totalShells);
  setCorals((prevCorals) => prevCorals + totalCorals);
  setTridents((prevTridents) => prevTridents + totalTridents);
  setPearls((prevPearls) => prevPearls + totalPearls);
};

  // const reroll = () => {
  //   {pearls && }
  // }

  const handleBuyCard = (card) => {
    if (card.price <= shells) {
      setDeck((prevDeck) => {
        // going through the deck, adding the card on the current board slot to the defense pile
        let newDeck = prevDeck.filter((c) => {
          if (c.boardSlot === card.boardSlot) {
            // Move the replaced card to the defense stack
            addToDefenseStack({ ...c, attack: false })
            return false
          }
          return true
        })

        newDeck = newDeck.filter((c) => c.name !== card.name)

        card.attack = true
        newDeck.push(card)
        setShells(0)
        return newDeck
      })
    } else {
      setShells(0)
      setTable((prevTable) => [...prevTable, card])
    }
  }

  const buyCard = (level) => {
    let card

    switch (level) {
      case 1:
        card = level1Cards[Math.floor(Math.random() * level1Cards.length)]
        setLevel1Cards(level1Cards.filter((c) => c.name !== card.name))
        break
      case 2:
        card = level2Cards[Math.floor(Math.random() * level2Cards.length)]
        setLevel2Cards(level2Cards.filter((c) => c.name !== card.name))
        break
      case 3:
        card = level3Cards[Math.floor(Math.random() * level3Cards.length)]
        setLevel3Cards(level3Cards.filter((c) => c.name !== card.name))
        break
      default:
        return
    }
    handleBuyCard(card)
  }

  return (
    <div>
      <div className="playersStats">
        <div className="player">
          <h1>{player}'s Base </h1>
          <div className="shells">Shells: {shells}</div>
          <div className="coral">Corals: {corals}</div>
          <div className="tridents">Tridents: {tridents}</div>
          <div className="pearls">Pearls: {pearls}</div>
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
                level1cards={level1Cards.length}
                level2cards={level2Cards.length}
                level3cards={level3Cards.length}
              />
            </div>
          ) : (
            <RollDice
            roll1={roll1}
            roll2={roll2}
            roll={roll}
            attack={attack}
            renderCardForAttack={renderCardForAttack}
            renderCardForDefense={renderCardForDefense}
            turn={turn}
            pearls={pearls}
            handleDefenseRewards={handleDefenseRewards} 
          />
          )}
        </>
      ) : (
        <div>Not your turn</div>
      )}

      <div className="base">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((slot) => (
          <CardSlot
            key={slot}
            slot={slot}
            cards={deck.filter((card) => card.boardSlot === slot)}
          />
        ))}
      </div>
      <div className="base">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((slot) => {
          const cards = defenseStack.filter((card) => card.boardSlot === slot)
          return (
            <div key={slot}>
              {cards.length > 0 ? (
                <DefenseCardSlot slot={slot} cards={cards} />
              ) : (
                <div className="emptyBox"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Base