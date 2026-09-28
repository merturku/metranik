import { describe, it, expect } from "vitest";
import { test_modul_256 } from "./test_modul_256";

describe("Test Modül 256", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_256.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
