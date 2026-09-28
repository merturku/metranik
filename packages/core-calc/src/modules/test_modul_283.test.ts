import { describe, it, expect } from "vitest";
import { test_modul_283 } from "./test_modul_283";

describe("Test Modül 283", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_283.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
