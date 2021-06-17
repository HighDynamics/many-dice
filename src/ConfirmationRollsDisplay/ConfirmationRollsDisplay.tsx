const ConfirmationRollsDisplay = ({
  totalRoll,
  rawRoll,
  target,
  threatRange,
}: {
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
      <div>
        | <span className={getClassName()}>{totalRoll}</span> |
      </div>
    </div>
  );
};

export default ConfirmationRollsDisplay;
