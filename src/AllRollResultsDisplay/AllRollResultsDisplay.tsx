import { getRollStatus, Roll } from "../rolls";

const AllRollResultsDisplay = ({
  position,
  roll,
  threatRange,
  target,
}: {
  position: number;
  roll: Roll;
  threatRange: number;
  target: number;
}) => {
  const getClassName = (): string => {
    let className = "";
    switch (true) {
      case roll.natural >= threatRange:
        className = "threat";
        break;
      case roll.natural === 1:
        className = "criticalFailure";
        break;
      case roll.total >= target:
        className = "success";
        break;
      case roll.total < target:
        className = "failure";
        break;
    }
    return className;
  };
  const status = getRollStatus(roll.natural, threatRange);
  return (
    <div>
      <span className="rollPosition">{position}.</span>{" "}
      <span className={getClassName()}>
        {roll.total}
        {status && ` ${status}`}
      </span>
      {roll.paired !== undefined && ` | ${roll.paired}`}
    </div>
  );
};

export default AllRollResultsDisplay;
