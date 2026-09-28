import { describe, it, expect } from "vitest";
import { test_modul_300 } from "./test_modul_300";

describe("Test Modül 300", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_300.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
