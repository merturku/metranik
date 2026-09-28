import { describe, it, expect } from "vitest";
import { test_modul_251 } from "./test_modul_251";

describe("Test Modül 251", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_251.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
