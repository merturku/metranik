import { describe, it, expect } from "vitest";
import { test_modul_311 } from "./test_modul_311";

describe("Test Modül 311", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_311.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
