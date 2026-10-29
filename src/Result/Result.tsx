import { useState } from "react";

import AllRollResultsDisplay from "../AllRollResultsDisplay/AllRollResultsDisplay";
import ConfirmationRollsDisplay from "../ConfirmationRollsDisplay/ConfirmationRollsDisplay";
import CopyRollsButton from "../CopyRollsButton/CopyRollsButton";
import RollColumns from "../RollColumns/RollColumns";
import { formatRoll, Roll } from "../rolls";

const Result = ({
  result,
  target,
  threatRange,
  rollConfirmations,
}: {
  result: Roll[];
  target: number;
  threatRange: number;
  rollConfirmations: (n: number) => Roll[];
}) => {
  const [confirmationRolls, setConfirmationRolls] = useState<Roll[]>([]);
  let threats = 0;
  let criticalFailures = 0;
  let successes = 0;
  let failures = 0;
  let confirmations = 0;

  result.forEach((roll) => {
    switch (true) {
      case roll.natural === 1:
        criticalFailures += 1;
        break;
      case roll.natural >= threatRange:
        threats += 1;
        break;
      case roll.total >= target:
        successes += 1;
        break;
      case roll.total < target:
        failures += 1;
        break;
    }
  });

  confirmationRolls.forEach((roll) => {
    switch (true) {
      case roll.total >= target || roll.natural >= threatRange:
        confirmations += 1;
    }
  });

  const resultDisplay = result.map((roll, i) => (
    <AllRollResultsDisplay
      key={i}
      position={i + 1}
      roll={roll}
      threatRange={threatRange}
      target={target}
    />
  ));

  const confirmationResults = confirmationRolls.map((roll, i) => (
    <ConfirmationRollsDisplay
      key={i}
      position={i + 1}
      roll={roll}
      target={target}
      threatRange={threatRange}
    />
  ));
  const rollsText = result
    .map((roll, i) => formatRoll(roll, i + 1, threatRange))
    .join("\n");
  const confirmationRollsText = confirmationRolls
    .map((roll, i) => formatRoll(roll, i + 1))
    .join("\n");
  const handleClick = () => {
    setConfirmationRolls(rollConfirmations(threats));
  };
  return (
    <>
      <h2>Result:</h2>
      <CopyRollsButton text={rollsText} />
      <RollColumns>{resultDisplay}</RollColumns>
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
          <CopyRollsButton
            text={confirmationRollsText}
            label="Copy confirmation rolls"
          />
          <RollColumns>{confirmationResults}</RollColumns>
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
