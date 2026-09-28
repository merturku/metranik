import { describe, it, expect } from "vitest";
import { test_modul_302 } from "./test_modul_302";

describe("Test Modül 302", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_302.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
