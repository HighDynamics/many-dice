const Target = ({
  target,
  handleTargetChange,
}: {
  target: number;
  handleTargetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      With a target of{" "}
      <input type="number" value={target} onChange={handleTargetChange} />
    </div>
  );
};

export default Target;
