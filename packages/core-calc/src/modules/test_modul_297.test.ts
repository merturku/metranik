import { describe, it, expect } from "vitest";
import { test_modul_297 } from "./test_modul_297";

describe("Test Modül 297", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_297.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
