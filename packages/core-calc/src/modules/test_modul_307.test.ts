import { describe, it, expect } from "vitest";
import { test_modul_307 } from "./test_modul_307";

describe("Test Modül 307", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_307.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
