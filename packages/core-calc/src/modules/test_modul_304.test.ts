import { describe, it, expect } from "vitest";
import { test_modul_304 } from "./test_modul_304";

describe("Test Modül 304", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_304.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
