const ConfirmationRollsDisplay = ({
  position,
  totalRoll,
  rawRoll,
  target,
  threatRange,
}: {
  position: number;
  totalRoll: number;
  rawRoll: number;
  target: number;
  threatRange: number;
}) => {
  const getClassName = (): string => {
    let className = "";
    switch (true) {
      case rawRoll >= threatRange:
        className = "threat";
        break;
      case rawRoll === 1 || totalRoll < target:
        className = "criticalFailure";
        break;
      case totalRoll >= target:
        className = "success";
        break;
    }
    return className;
  };

  return (
    <div>
      <span className="rollPosition">{position}.</span>{" "}
      <span className={getClassName()}>{totalRoll}</span>
    </div>
  );
};

export default ConfirmationRollsDisplay;
