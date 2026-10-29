export interface Roll {
  natural: number;
  total: number;
  paired?: number;
}

export interface DiceGroup {
  id: number;
  count: number;
  sides: number;
}

export const DIE_SIZES = [4, 6, 8, 10, 12, 20, 100];

export const MAX_DICE_PER_GROUP = 100;

export const clampDiceCount = (count: number): number =>
  Math.min(MAX_DICE_PER_GROUP, Math.max(0, Math.floor(count) || 0));

export const rollDie = (sides: number): number =>
  Math.floor(Math.random() * sides) + 1;

export const NAT_1 = "Nat 1";
export const NAT_20 = "Nat 20";
export const CRIT_THREAT = "Crit Threat";

export const MIN_THREAT_RANGE = 2;
export const MAX_THREAT_RANGE = 20;

export const clampThreatRange = (threatRange: number): number =>
  Math.min(
    MAX_THREAT_RANGE,
    Math.max(MIN_THREAT_RANGE, Math.floor(threatRange) || 0)
  );

// Judged on the natural die. Without a threat range, only Nat 1 and Nat 20 apply.
export const getRollStatus = (natural: number, threatRange?: number): string => {
  switch (true) {
    case natural === 1:
      return NAT_1;
    case natural === 20:
      return NAT_20;
    case threatRange !== undefined && natural >= threatRange:
      return CRIT_THREAT;
    default:
      return "";
  }
};

export const formatRoll = (
  roll: Roll,
  position: number,
  threatRange?: number
): string => {
  const status = getRollStatus(roll.natural, threatRange);
  return [
    `${position}. ${roll.total}`,
    roll.paired === undefined ? "" : `| ${roll.paired}`,
    status,
  ]
    .filter(Boolean)
    .join(" ");
};
