const AllRollResultsDisplay = ({
  rawRoll,
  totalRoll,
  threatRange,
  target,
}: {
  rawRoll: number;
  totalRoll: number;
  threatRange: number;
  target: number;
}) => {
  const getClassName = (): string => {
    let className = "";
    switch (true) {
      case rawRoll >= threatRange:
        className = "threat";
        break;
      case rawRoll === 1:
        className = "criticalFailure";
        break;
      case totalRoll >= target:
        className = "success";
        break;
      case totalRoll < target:
        className = "failure";
        break;
    }
    return className;
  };
  return (
    <div>
      | <span className={getClassName()}>{totalRoll}</span> |
    </div>
  );
};

export default AllRollResultsDisplay;
