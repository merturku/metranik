import { describe, it, expect } from "vitest";
import { test_modul_266 } from "./test_modul_266";

describe("Test Modül 266", () => {
  it("Test: 10 → 20", () => {
    const r = test_modul_266.compute({ input1: 10 });
    expect(r.value.result).toBe(20);
  });
});
