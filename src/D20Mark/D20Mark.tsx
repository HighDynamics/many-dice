const D20Mark = () => {
  return (
    <svg
      className="d20Mark"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" />
      <polygon points="16,9 22,20 10,20" />
      <path d="M16 2v7M28 9l-6 11M4 9l6 11M28 23l-6-3M4 23l6-3M16 30V20" />
      <path
        className="d20Spark"
        d="M16 12.5c.3 2.2 1.3 3.2 3.5 3.5-2.2.3-3.2 1.3-3.5 3.5-.3-2.2-1.3-3.2-3.5-3.5 2.2-.3 3.2-1.3 3.5-3.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};

export default D20Mark;
