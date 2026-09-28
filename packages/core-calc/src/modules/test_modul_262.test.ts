import { describe, it, expect } from "vitest";
import { test_modul_262 } from "./test_modul_262";

describe("Test Modül 262", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_262.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
