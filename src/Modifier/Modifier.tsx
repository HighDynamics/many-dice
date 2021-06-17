const Modifier = ({
  modifier,
  handleModifierChange,
}: {
  modifier: number;
  handleModifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      With a{" "}
      <input type="number" value={modifier} onChange={handleModifierChange} />{" "}
      modifier
    </div>
  );
};

export default Modifier;
