import React, { ReactChild, useState } from "react";
import "./App.css";
import DiceInput from "./DiceInput/DiceInput";
import Modifier from "./Modifier/Modifier";
import Target from "./Target/Target";
import ThreatRange from "./ThreatRange/ThreatRange";
import Result from "./Result/Result";

const App = (): ReactChild => {
  const [numOfDice, setNumOfDice] = useState<number>(1);
  const [modifier, setModifier] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [threatRange, setThreatRange] = useState<number>(20);
  const [result, setResult] = useState<number[]>([]);

  const handleChange =
    (fn: (e: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(Number(e.currentTarget.value));

  const rollDice = (numOfDice: number): number[] => {
    let i = 0;
    const resultArray: number[] = [];
    while (i < numOfDice) {
      resultArray.push(Math.floor(Math.random() * 20) + 1 + modifier);
      i++;
    }
    return resultArray;
  };

  const rollResult: number[] = rollDice(numOfDice);

  const handleClick = () => {
    setResult(rollResult);
  };

  return (
    <div className="App">
      <div className="inputsContainer">
        <DiceInput
          numOfDice={numOfDice}
          handleDiceNumChange={handleChange(setNumOfDice)}
        />
        <Modifier
          modifier={modifier}
          handleModifierChange={handleChange(setModifier)}
        />
        <Target target={target} handleTargetChange={handleChange(setTarget)} />
        <ThreatRange
          threatRange={threatRange}
          handleThreatRangeChange={handleChange(setThreatRange)}
        />
      </div>
      <button onClick={handleClick}>Roll</button>
      <Result
        result={result}
        target={target}
        threatRange={threatRange}
        modifier={modifier}
        rollDice={rollDice}
      />
    </div>
  );
};

export default App;
