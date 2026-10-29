const Target = ({
  target,
  handleTargetChange,
}: {
  target: number;
  handleTargetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="inputRow">
      <span className="inputLabel">With a target of</span>
      <input
        type="number"
        inputMode="numeric"
        value={target}
        onChange={handleTargetChange}
      />
      <span className="inputSuffix" />
    </label>
  );
};

export default Target;
