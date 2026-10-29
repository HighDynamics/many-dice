import { getRollStatus, Roll } from "../rolls";

const ConfirmationRollsDisplay = ({
  position,
  roll,
  target,
  threatRange,
}: {
  position: number;
  roll: Roll;
  target: number;
  threatRange: number;
}) => {
  const getClassName = (): string => {
    let className = "";
    switch (true) {
      case roll.natural >= threatRange:
        className = "threat";
        break;
      case roll.natural === 1 || roll.total < target:
        className = "criticalFailure";
        break;
      case roll.total >= target:
        className = "success";
        break;
    }
    return className;
  };
  const status = getRollStatus(roll.natural);

  return (
    <div>
      <span className="rollPosition">{position}.</span>{" "}
      <span className={getClassName()}>
        {roll.total}
        {status && ` ${status}`}
      </span>
    </div>
  );
};

export default ConfirmationRollsDisplay;
