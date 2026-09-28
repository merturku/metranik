import { describe, it, expect } from "vitest";
import { test_modul_291 } from "./test_modul_291";

describe("Test Modül 291", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_291.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
