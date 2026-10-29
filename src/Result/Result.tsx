import { useState } from "react";

import AllRollResultsDisplay from "../AllRollResultsDisplay/AllRollResultsDisplay";
import ConfirmationRollsDisplay from "../ConfirmationRollsDisplay/ConfirmationRollsDisplay";
import CopyRollsButton from "../CopyRollsButton/CopyRollsButton";
import Divider from "../Divider/Divider";
import RollColumns from "../RollColumns/RollColumns";
import { CRIT_THREAT, formatRoll, NAT_20, Roll } from "../rolls";

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
      <div className="panelHeader">
        <h2>Result</h2>
        <CopyRollsButton text={rollsText} />
      </div>
      <RollColumns rolls={result} statusWidth={CRIT_THREAT.length}>
        {resultDisplay}
      </RollColumns>
      <div className="tallies">
        <Tally label="Successes" value={successes} />
        <Tally label="Failures" value={failures} />
        <Tally
          label="Critical Failures"
          value={criticalFailures}
          className="tallyCrit"
        />
        <Tally label="Threats" value={threats} className="tallyThreat" />
      </div>
      {result.length > 0 && (
        <>
          <Divider />
          <div className="panelHeader">
            <h3>Threat confirmations</h3>
            <div className="actions">
              <button onClick={handleClick}>Roll Threat Confirmations</button>
              <CopyRollsButton
                text={confirmationRollsText}
                label="Copy confirmation rolls"
              />
            </div>
          </div>
          <RollColumns rolls={confirmationRolls} statusWidth={NAT_20.length}>
            {confirmationResults}
          </RollColumns>
          {confirmationRolls.length > 0 && (
            <div className="tallies single">
              <Tally
                label="Confirmations"
                value={confirmations}
                className="tallyThreat"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

const Tally = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number;
  className?: string;
}) => (
  <div className="tally">
    <span className="tallyLabel">{label}</span>
    <span className={`tallyValue ${className}`}>{value}</span>
  </div>
);

export default Result;
