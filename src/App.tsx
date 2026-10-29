import React, { ReactChild, useRef, useState } from "react";
import "./App.css";
import D20Mark from "./D20Mark/D20Mark";
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

  const removeGroup = (id: number) => {
    const remaining = pairedGroups.filter((group) => group.id !== id);
    setPairedGroups(remaining);
    if (remaining.length === 0) setPairedModifier(0);
  };

  // A paired roll exists once it has any dice.
  const rollPaired = (): number | undefined => {
    if (pairedGroups.length === 0) return undefined;
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
      <header className="appHeader">
        <D20Mark />
        <h1>Many Dice</h1>
      </header>
      <section className="panel" aria-label="Roll setup">
        <div className="inputsContainer">
          <DiceInput
            numOfDice={numOfDice}
            handleDiceNumChange={handleChange(setNumOfDice)}
          />
          <Modifier
            modifier={modifier}
            handleModifierChange={handleChange(setModifier)}
          />
          <Target
            target={target}
            handleTargetChange={handleChange(setTarget)}
          />
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
        <div className="rollAction">
          <button className="rollButton" onClick={handleClick}>
            Roll
          </button>
        </div>
      </section>
      <section className="panel" aria-label="Result">
        <Result
          result={result}
          target={target}
          threatRange={threatRange}
          rollConfirmations={(n) => rollDice(n, false)}
        />
      </section>
    </div>
  );
};

export default App;
