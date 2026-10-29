import { useState } from "react";

export const formatRolls = (rolls: number[]): string =>
  rolls.map((roll, i) => `${i + 1}. ${roll}`).join("\n");

const CopyRollsButton = ({
  rolls,
  label = "Copy rolls",
}: {
  rolls: number[];
  label?: string;
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(formatRolls(rolls));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleClick} disabled={rolls.length === 0}>
      {copied ? "Copied!" : label}
    </button>
  );
};

export default CopyRollsButton;
