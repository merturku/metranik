import { describe, it, expect } from "vitest";
import { test_modul_313 } from "./test_modul_313";

describe("Test Modül 313", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_313.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
