import React, { ReactChild, useRef, useState } from "react";
import "./App.css";
import DiceInput from "./DiceInput/DiceInput";
import Modifier from "./Modifier/Modifier";
import PairedRoll from "./PairedRoll/PairedRoll";
import Target from "./Target/Target";
import ThreatRange from "./ThreatRange/ThreatRange";
import Result from "./Result/Result";
import {
  clampDiceCount,
  clampThreatRange,
  DiceGroup,
  Roll,
  rollDie,
} from "./rolls";

const App = (): ReactChild => {
  const [numOfDice, setNumOfDice] = useState<number>(1);
  const [modifier, setModifier] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [threatRangeInput, setThreatRangeInput] = useState<number>(20);
  const [pairedGroups, setPairedGroups] = useState<DiceGroup[]>([]);
  const [pairedModifier, setPairedModifier] = useState<number>(0);
  const [result, setResult] = useState<Roll[]>([]);
  const nextGroupId = useRef<number>(0);

  // The input keeps what was typed; rolls use the clamped range.
  const threatRange = clampThreatRange(threatRangeInput);

  const handleChange =
    (fn: (e: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(Number(e.currentTarget.value));

  const updateGroup = (id: number, changes: Partial<DiceGroup>) =>
    setPairedGroups(
      pairedGroups.map((group) =>
        group.id === id ? { ...group, ...changes } : group
      )
    );

  const addGroup = () => {
    nextGroupId.current += 1;
    setPairedGroups([
      ...pairedGroups,
      { id: nextGroupId.current, count: 1, sides: 6 },
    ]);
  };

  const removeGroup = (id: number) =>
    setPairedGroups(pairedGroups.filter((group) => group.id !== id));

  // A paired roll exists once it has any dice or a modifier.
  const rollPaired = (): number | undefined => {
    if (pairedGroups.length === 0 && pairedModifier === 0) return undefined;
    let total = pairedModifier;
    pairedGroups.forEach(({ count, sides }) => {
      for (let i = 0; i < count; i++) {
        total += rollDie(sides);
      }
    });
    return total;
  };

  const rollDice = (numOfDice: number, withPaired: boolean): Roll[] => {
    let i = 0;
    const resultArray: Roll[] = [];
    while (i < numOfDice) {
      const natural = rollDie(20);
      resultArray.push({
        natural,
        total: natural + modifier,
        paired: withPaired ? rollPaired() : undefined,
      });
      i++;
    }
    return resultArray;
  };

  const handleClick = () => {
    setResult(rollDice(numOfDice, true));
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
        <PairedRoll
          groups={pairedGroups}
          modifier={pairedModifier}
          handleCountChange={(id, count) =>
            updateGroup(id, { count: clampDiceCount(count) })
          }
          handleSidesChange={(id, sides) => updateGroup(id, { sides })}
          handleModifierChange={handleChange(setPairedModifier)}
          addGroup={addGroup}
          removeGroup={removeGroup}
        />
      </div>
      <button onClick={handleClick}>Roll</button>
      <Result
        result={result}
        target={target}
        threatRange={threatRange}
        rollConfirmations={(n) => rollDice(n, false)}
      />
    </div>
  );
};

export default App;
