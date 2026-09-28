import { describe, it, expect } from "vitest";
import { test_modul_287 } from "./test_modul_287";

describe("Test Modül 287", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_287.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
