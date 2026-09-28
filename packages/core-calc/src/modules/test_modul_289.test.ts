import { describe, it, expect } from "vitest";
import { test_modul_289 } from "./test_modul_289";

describe("Test Modül 289", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_289.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
