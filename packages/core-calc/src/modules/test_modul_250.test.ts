import { describe, it, expect } from "vitest";
import { test_modul_250 } from "./test_modul_250";

describe("Test Modül 250", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_250.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
