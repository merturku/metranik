import { describe, it, expect } from "vitest";
import { test_modul_290 } from "./test_modul_290";

describe("Test Modül 290", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_290.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
