const ThreatRange = ({
  threatRange,
  handleThreatRangeChange,
}: {
  threatRange: number;
  handleThreatRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      And a threat range of{" "}
      <input
        type="number"
        value={threatRange}
        max={20}
        onChange={handleThreatRangeChange}
      />{" "}
      ({threatRange}-20)
    </div>
  );
};

export default ThreatRange;
