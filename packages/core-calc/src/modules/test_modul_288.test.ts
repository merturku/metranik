import { describe, it, expect } from "vitest";
import { test_modul_288 } from "./test_modul_288";

describe("Test Modül 288", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_288.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
