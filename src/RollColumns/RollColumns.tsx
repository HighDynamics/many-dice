import { Children, ReactNode } from "react";

const ROLLS_PER_COLUMN = 10;

const RollColumns = ({ children }: { children: ReactNode }) => {
  const rolls = Children.toArray(children);
  const columns: ReactNode[][] = [];
  for (let i = 0; i < rolls.length; i += ROLLS_PER_COLUMN) {
    columns.push(rolls.slice(i, i + ROLLS_PER_COLUMN));
  }
  return (
    <div className="resultContainer">
      {columns.map((column, i) => (
        <div className="rollColumn" key={i}>
          {column}
        </div>
      ))}
    </div>
  );
};

export default RollColumns;
