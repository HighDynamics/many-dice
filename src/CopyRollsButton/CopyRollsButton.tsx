import { useEffect, useRef, useState } from "react";

const RESULT_LABELS = { copied: "Copied!", failed: "Copy failed" };

const CopyRollsButton = ({
  text,
  label = "Copy rolls",
}: {
  text: string;
  label?: string;
}) => {
  const [result, setResult] = useState<"copied" | "failed" | null>(null);
  const timer = useRef<number>();
  const mounted = useRef<boolean>(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      window.clearTimeout(timer.current);
    };
  }, []);

  const handleClick = async () => {
    window.clearTimeout(timer.current);
    let outcome: "copied" | "failed" = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      outcome = "failed";
    }
    if (!mounted.current) return;
    setResult(outcome);
    timer.current = window.setTimeout(() => setResult(null), 1500);
  };

  return (
    <button onClick={handleClick} disabled={text === ""}>
      {result ? RESULT_LABELS[result] : label}
    </button>
  );
};

export default CopyRollsButton;
