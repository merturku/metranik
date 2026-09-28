import { describe, it, expect } from "vitest";
import { test_modul_241 } from "./test_modul_241";

describe("Test Modül 241", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_241.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
