import { describe, it, expect } from "vitest";
import { test_modul_274 } from "./test_modul_274";

describe("Test Modül 274", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_274.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
