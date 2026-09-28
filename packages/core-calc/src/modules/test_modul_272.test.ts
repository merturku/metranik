import { describe, it, expect } from "vitest";
import { test_modul_272 } from "./test_modul_272";

describe("Test Modül 272", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_272.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
