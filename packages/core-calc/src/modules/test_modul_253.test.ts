import { describe, it, expect } from "vitest";
import { test_modul_253 } from "./test_modul_253";

describe("Test Modül 253", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_253.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
