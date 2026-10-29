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
        max={20}
        onChange={handleThreatRangeChange}
      />
      <span className="inputSuffix">({threatRange}-20)</span>
    </label>
  );
};

export default ThreatRange;
