import { describe, it, expect } from "vitest";
import { modul_248 } from "./modul_248";

describe("Modül 248", () => {
  it("Test: 10 → 15", () => {
    const r = modul_248.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
