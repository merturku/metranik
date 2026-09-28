import { describe, it, expect } from "vitest";
import { test_modul_255 } from "./test_modul_255";

describe("Test Modül 255", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_255.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
