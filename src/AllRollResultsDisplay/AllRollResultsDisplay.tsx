import RollRow from "../RollRow/RollRow";
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
  return (
    <RollRow
      position={position}
      total={roll.total}
      paired={roll.paired}
      status={getRollStatus(roll.natural, threatRange)}
      className={getClassName()}
    />
  );
};

export default AllRollResultsDisplay;
