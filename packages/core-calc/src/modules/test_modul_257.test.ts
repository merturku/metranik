import { describe, it, expect } from "vitest";
import { test_modul_257 } from "./test_modul_257";

describe("Test Modül 257", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_257.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
