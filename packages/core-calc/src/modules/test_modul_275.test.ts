import { describe, it, expect } from "vitest";
import { test_modul_275 } from "./test_modul_275";

describe("Test Modül 275", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_275.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
