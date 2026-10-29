import RollRow from "../RollRow/RollRow";
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

  return (
    <RollRow
      position={position}
      total={roll.total}
      paired={roll.paired}
      status={getRollStatus(roll.natural)}
      className={getClassName()}
    />
  );
};

export default ConfirmationRollsDisplay;
