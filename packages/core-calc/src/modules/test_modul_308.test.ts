import { describe, it, expect } from "vitest";
import { test_modul_308 } from "./test_modul_308";

describe("Test Modül 308", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_308.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
