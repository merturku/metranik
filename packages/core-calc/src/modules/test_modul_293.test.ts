import { describe, it, expect } from "vitest";
import { test_modul_293 } from "./test_modul_293";

describe("Test Modül 293", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_293.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
