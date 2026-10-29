// Each part gets its own cell so the parts line up down a RollColumns column.
const RollRow = ({
  position,
  total,
  paired,
  status,
  className,
}: {
  position: number;
  total: number;
  paired?: number;
  status: string;
  className: string;
}) => {
  return (
    <div className="rollRow">
      <span className="rollPosition">{position}.</span>
      <span className={`rollTotal ${className}`}>{total}</span>
      <span className="rollPipe">{paired !== undefined && "|"}</span>
      <span className="rollPaired">{paired}</span>
      <span className={`rollStatus ${className}`}>{status}</span>
    </div>
  );
};

export default RollRow;
