import { describe, it, expect } from "vitest";
import { test_modul_303 } from "./test_modul_303";

describe("Test Modül 303", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_303.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
