import { describe, it, expect } from "vitest";
import { test_modul_237 } from "./test_modul_237";

describe("Test Modül 237", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_237.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
