const DiceInput = ({
  numOfDice,
  handleDiceNumChange,
}: {
  numOfDice: number;
  handleDiceNumChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      I want to roll{" "}
      <input type="number" value={numOfDice} onChange={handleDiceNumChange} />{" "}
      d20s
    </div>
  );
};

export default DiceInput;
