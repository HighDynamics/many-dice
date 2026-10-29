import React, { ReactChild, useState } from "react";
import "./App.css";
import DiceInput from "./DiceInput/DiceInput";
import Modifier from "./Modifier/Modifier";
import Target from "./Target/Target";
import ThreatRange from "./ThreatRange/ThreatRange";
import Result from "./Result/Result";
import { clampThreatRange, Roll, rollDie } from "./rolls";

const App = (): ReactChild => {
  const [numOfDice, setNumOfDice] = useState<number>(1);
  const [modifier, setModifier] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [threatRangeInput, setThreatRangeInput] = useState<number>(20);
  const [result, setResult] = useState<Roll[]>([]);

  // The input keeps what was typed; rolls use the clamped range.
  const threatRange = clampThreatRange(threatRangeInput);

  const handleChange =
    (fn: (e: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(Number(e.currentTarget.value));

  const rollDice = (numOfDice: number): Roll[] => {
    let i = 0;
    const resultArray: Roll[] = [];
    while (i < numOfDice) {
      const natural = rollDie(20);
      resultArray.push({ natural, total: natural + modifier });
      i++;
    }
    return resultArray;
  };

  const handleClick = () => {
    setResult(rollDice(numOfDice));
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
          threatRange={threatRangeInput}
          handleThreatRangeChange={handleChange(setThreatRangeInput)}
        />
      </div>
      <button onClick={handleClick}>Roll</button>
      <Result
        result={result}
        target={target}
        threatRange={threatRange}
        rollConfirmations={rollDice}
      />
    </div>
  );
};

export default App;
