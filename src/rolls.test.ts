import {
  clampThreatRange,
  CRIT_THREAT,
  formatRoll,
  getRollStatus,
  NAT_1,
  NAT_20,
} from "./rolls";

describe("getRollStatus", () => {
  test("a natural 1 is Nat 1", () => {
    expect(getRollStatus(1, 17)).toBe(NAT_1);
    expect(getRollStatus(1)).toBe(NAT_1);
  });

  test("a natural 20 is Nat 20", () => {
    expect(getRollStatus(20, 21)).toBe(NAT_20);
    expect(getRollStatus(20)).toBe(NAT_20);
  });

  test("a roll in the threat range is Crit Threat", () => {
    expect(getRollStatus(17, 17)).toBe(CRIT_THREAT);
    expect(getRollStatus(19, 17)).toBe(CRIT_THREAT);
  });

  test("a roll below the threat range has no status", () => {
    expect(getRollStatus(16, 17)).toBe("");
    expect(getRollStatus(10, 20)).toBe("");
  });

  test("Nat 20 wins over Crit Threat", () => {
    expect(getRollStatus(20, 17)).toBe(NAT_20);
    expect(getRollStatus(20, 20)).toBe(NAT_20);
  });

  test("without a threat range only Nat 1 and Nat 20 apply", () => {
    expect(getRollStatus(19)).toBe("");
    expect(getRollStatus(20)).toBe(NAT_20);
  });

  test("a threat range typed below 2 counts as 2", () => {
    [1, 0, -5, NaN].forEach((typed) => {
      const threatRange = clampThreatRange(typed);
      expect(threatRange).toBe(2);
      expect(getRollStatus(1, threatRange)).toBe(NAT_1);
      expect(getRollStatus(2, threatRange)).toBe(CRIT_THREAT);
      expect(getRollStatus(20, threatRange)).toBe(NAT_20);
    });
  });
});

describe("clampThreatRange", () => {
  test("keeps the range between 2 and 20", () => {
    expect(clampThreatRange(17)).toBe(17);
    expect(clampThreatRange(2)).toBe(2);
    expect(clampThreatRange(20)).toBe(20);
    expect(clampThreatRange(25)).toBe(20);
  });

  test("rounds down", () => {
    expect(clampThreatRange(17.9)).toBe(17);
  });
});

describe("formatRoll", () => {
  test("numbers the roll and puts the status after the paired total", () => {
    expect(formatRoll({ natural: 19, total: 19, paired: 52 }, 1, 17)).toBe(
      "1. 19 | 52 Crit Threat"
    );
  });

  test("a roll with no status and no paired roll is just the number and total", () => {
    expect(formatRoll({ natural: 7, total: 9 }, 3, 17)).toBe("3. 9");
  });

  test("a paired roll with no status keeps the pipe", () => {
    expect(formatRoll({ natural: 7, total: 9, paired: 40 }, 2, 17)).toBe(
      "2. 9 | 40"
    );
  });

  test("a status with no paired roll has no pipe", () => {
    expect(formatRoll({ natural: 19, total: 21 }, 1, 17)).toBe(
      "1. 21 Crit Threat"
    );
  });

  test("the status follows the natural die, not the modified total", () => {
    expect(formatRoll({ natural: 1, total: 4, paired: 41 }, 10, 17)).toBe(
      "10. 4 | 41 Nat 1"
    );
    expect(formatRoll({ natural: 20, total: 22, paired: 60 }, 4, 17)).toBe(
      "4. 22 | 60 Nat 20"
    );
    expect(formatRoll({ natural: 16, total: 25 }, 5, 17)).toBe("5. 25");
  });

  test("confirmation rolls, without a threat range, only get Nat 1 and Nat 20", () => {
    expect(formatRoll({ natural: 19, total: 19 }, 1)).toBe("1. 19");
    expect(formatRoll({ natural: 1, total: 1 }, 2)).toBe("2. 1 Nat 1");
    expect(formatRoll({ natural: 20, total: 20 }, 3)).toBe("3. 20 Nat 20");
  });
});
