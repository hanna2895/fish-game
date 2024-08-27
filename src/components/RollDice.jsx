import React, { useState } from "react";

export const RollDice = ({
  roll1,
  roll2,
  roll,
  attack,
  renderCardForAttack,
  renderCardForDefense,
  pearls,
  setPearls,
  turn,
  handleDefenseRewards, 
}) => {
  const [defenseChoice, setDefenseChoice] = useState(null);

  // Define handleReRoll function
  const handleReRoll = () => {
    roll();
    setPearls((prevPearls) => {
      const newPearls = prevPearls - 1; 
      return newPearls;
    });
  };

  // Define handleDefenseChoice function
  const handleDefenseChoice = (choice) => {
    setDefenseChoice(choice);
    if (!turn) {
      handleDefenseRewards(choice); // Call the function to handle defense rewards
    }
  };

  return (
    <div className="rollContainer">
      {!(roll1 && roll2) ? (
        <button onClick={() => roll()}>Roll</button>
      ) : (
        <>
          {pearls && (
            <div className="rerolling">
              <button onClick={handleReRoll}>ReRoll Both</button>
            </div>
          )}
          <div className="splitContainer">
            <div className="split">
              <div className="die">
                {pearls && (
                  <div className="rerolling">
                    <button onClick={handleReRoll}>ReRoll</button>
                  </div>
                )}
                {roll1}
              </div>
              <div className="die">
                {pearls && (
                  <div className="rerolling">
                    <button onClick={handleReRoll}>ReRoll</button>
                  </div>
                )}
                {roll2}
              </div>
            </div>
            {!turn && (
              <div className="defenseChoice">
                <button onClick={() => handleDefenseChoice(roll1)}>
                  Choose {roll1} for Defense
                </button>
                <button onClick={() => handleDefenseChoice(roll2)}>
                  Choose {roll2} for Defense
                </button>
                <button onClick={() => handleDefenseChoice(roll1 + roll2)}>
                  Choose {roll1 + roll2} for Defense
                </button>
              </div>
            )}
            <div className="splitRewards">
              {turn ? renderCardForAttack(roll1) : renderCardForDefense(roll1)}
              {turn ? renderCardForAttack(roll2) : renderCardForDefense(roll2)}
            </div>
            {turn && <button onClick={() => attack(roll1, roll2)}>Split</button>}
          </div>
          <div className="totalContainer">
            <div className="dice">{roll1 + roll2}</div>
            <div className="totalRewards">
              {turn
                ? renderCardForAttack(roll1 + roll2)
                : renderCardForDefense(roll1 + roll2)}
            </div>
            {turn && (
              <button onClick={() => attack(roll1 + roll2)}>Total</button>
            )}
          </div>
        </>
      )}
      {!turn && defenseChoice && (
        <div className="chosenDefenseRewards">
          <h3>Chosen Defense Reward for {defenseChoice}</h3>
          {renderCardForDefense(defenseChoice)}
        </div>
      )}
    </div>
  );
};