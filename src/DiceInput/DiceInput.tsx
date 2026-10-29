const DiceInput = ({
  numOfDice,
  handleDiceNumChange,
}: {
  numOfDice: number;
  handleDiceNumChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="inputRow">
      <span className="inputLabel">I want to roll</span>
      <input
        type="number"
        inputMode="numeric"
        value={numOfDice}
        onChange={handleDiceNumChange}
      />
      <span className="inputSuffix">d20s</span>
    </label>
  );
};

export default DiceInput;
