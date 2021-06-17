import { useState } from "react";

import AllRollResultsDisplay from "../AllRollResultsDisplay/AllRollResultsDisplay";
import ConfirmationRollsDisplay from "../ConfirmationRollsDisplay/ConfirmationRollsDisplay";

const Result = ({
  result,
  target,
  threatRange,
  modifier,
  rollDice,
}: {
  result: number[];
  target: number;
  threatRange: number;
  modifier: number;
  rollDice: (n: number) => number[];
}) => {
  const [confirmationRolls, setConfirmationRolls] = useState<number[]>([]);
  let threats = 0;
  let criticalFailures = 0;
  let successes = 0;
  let failures = 0;
  let confirmations = 0;

  result.forEach((n) => {
    switch (true) {
      case n - modifier === 1:
        criticalFailures += 1;
        break;
      case n - modifier >= threatRange:
        threats += 1;
        break;
      case n >= target:
        successes += 1;
        break;
      case n < target:
        failures += 1;
        break;
    }
  });

  confirmationRolls.forEach((n) => {
    switch (true) {
      case n >= target || n - modifier >= threatRange:
        confirmations += 1;
    }
  });

  const resultDisplay = result.map((n) => (
    <AllRollResultsDisplay
      rawRoll={n - modifier}
      totalRoll={n}
      threatRange={threatRange}
      target={target}
    />
  ));

  const confirmationResults = confirmationRolls.map((n) => (
    <ConfirmationRollsDisplay
      rawRoll={n - modifier}
      totalRoll={n}
      target={target}
      threatRange={threatRange}
    />
  ));
  const handleClick = () => {
    setConfirmationRolls(rollDice(threats));
  };
  return (
    <>
      <h2>Result:</h2>
      <div className="resultContainer">{resultDisplay}</div>
      <div>
        <em>Successes:</em> {successes}
        <br />
        <em>Failures:</em> {failures}
        <br />
        <em>Critical Failures:</em> {criticalFailures}
        <br />
        <em>Threats:</em> {threats}
      </div>
      {result.length > 0 && (
        <div>
          <button onClick={handleClick}>Roll Threat Confirmations</button>
          <div className="resultContainer">{confirmationResults}</div>
          {confirmationRolls.length > 0 && (
            <div>
              <em>Confirmations:</em> {confirmations}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Result;
