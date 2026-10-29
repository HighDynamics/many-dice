import { CRIT_THREAT, NAT_1, NAT_20 } from "../rolls";

const STATUS_CLASSES: Record<string, string> = {
  [NAT_1]: "statusNat1",
  [NAT_20]: "statusNat20",
  [CRIT_THREAT]: "statusCrit",
};

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
      <span className={`rollStatus ${STATUS_CLASSES[status] ?? ""}`}>
        {status}
      </span>
    </div>
  );
};

export default RollRow;
