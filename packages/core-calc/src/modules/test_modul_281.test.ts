import { describe, it, expect } from "vitest";
import { test_modul_281 } from "./test_modul_281";

describe("Test Modül 281", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_281.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
