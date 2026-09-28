import { describe, it, expect } from "vitest";
import { test_modul_326 } from "./test_modul_326";

describe("Test Modül 326", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_326.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
