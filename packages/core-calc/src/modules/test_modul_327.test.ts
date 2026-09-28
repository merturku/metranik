import { describe, it, expect } from "vitest";
import { test_modul_327 } from "./test_modul_327";

describe("Test Modül 327", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_327.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
