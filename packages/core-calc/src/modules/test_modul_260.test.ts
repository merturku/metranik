import { describe, it, expect } from "vitest";
import { test_modul_260 } from "./test_modul_260";

describe("Test Modül 260", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_260.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
