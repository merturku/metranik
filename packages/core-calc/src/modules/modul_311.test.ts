import { describe, it, expect } from "vitest";
import { modul_311 } from "./modul_311";

describe("Modül 311", () => {
  it("Test: 10 → 15", () => {
    const r = modul_311.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
