import { describe, it, expect } from "vitest";
import { test_modul_298 } from "./test_modul_298";

describe("Test Modül 298", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_298.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
