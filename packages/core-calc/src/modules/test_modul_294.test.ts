import { describe, it, expect } from "vitest";
import { test_modul_294 } from "./test_modul_294";

describe("Test Modül 294", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_294.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
