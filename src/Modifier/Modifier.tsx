const Modifier = ({
  modifier,
  handleModifierChange,
}: {
  modifier: number;
  handleModifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="inputRow">
      <span className="inputLabel">With a</span>
      <input type="number" value={modifier} onChange={handleModifierChange} />
      <span className="inputSuffix">modifier</span>
    </label>
  );
};

export default Modifier;
