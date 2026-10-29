import {
  clampThreatRange,
  MAX_THREAT_RANGE,
  MIN_THREAT_RANGE,
} from "../rolls";

const ThreatRange = ({
  threatRange,
  handleThreatRangeChange,
}: {
  threatRange: number;
  handleThreatRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="inputRow">
      <span className="inputLabel">And a threat range of</span>
      <input
        type="number"
        value={threatRange}
        min={MIN_THREAT_RANGE}
        max={MAX_THREAT_RANGE}
        onChange={handleThreatRangeChange}
      />
      <span className="inputSuffix">
        ({clampThreatRange(threatRange)}-{MAX_THREAT_RANGE})
      </span>
    </label>
  );
};

export default ThreatRange;
