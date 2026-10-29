import { Children, CSSProperties, ReactNode } from "react";

import { Roll } from "../rolls";

const ROLLS_PER_COLUMN = 10;

const digits = (n: number): number => String(n).length;

const widest = (values: number[]): number =>
  values.reduce((width, value) => Math.max(width, digits(value)), 0);

// Every column on the grid gets the same part widths (in ch, for the
// monospace font), sized for the widest value in the list. The status part
// is always reserved, even for columns without one.
const RollColumns = ({
  rolls,
  statusWidth,
  children,
}: {
  rolls: Roll[];
  statusWidth: number;
  children: ReactNode;
}) => {
  const rows = Children.toArray(children);
  const columns: ReactNode[][] = [];
  for (let i = 0; i < rows.length; i += ROLLS_PER_COLUMN) {
    columns.push(rows.slice(i, i + ROLLS_PER_COLUMN));
  }

  const hasPaired = rolls.some((roll) => roll.paired !== undefined);
  const widths = [
    digits(rolls.length) + 2,
    widest(rolls.map((roll) => roll.total)),
    hasPaired ? 3 : 0,
    hasPaired ? widest(rolls.map((roll) => roll.paired ?? 0)) : 0,
    statusWidth + 1,
  ];
  const style = {
    "--column-tracks": widths.map((width) => `${width}ch`).join(" "),
    "--column-width": `${widths.reduce((sum, width) => sum + width, 0)}ch`,
  } as CSSProperties;

  return (
    <div className="resultContainer" style={style}>
      {columns.map((column, i) => (
        <div className="rollColumn" key={i}>
          {column}
        </div>
      ))}
    </div>
  );
};

export default RollColumns;
