import { describe, it, expect } from "vitest";
import { test_modul_238 } from "./test_modul_238";

describe("Test Modül 238", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_238.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
