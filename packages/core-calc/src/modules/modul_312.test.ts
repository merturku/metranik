import { describe, it, expect } from "vitest";
import { modul_312 } from "./modul_312";

describe("Modül 312", () => {
  it("Test: 10 → 15", () => {
    const r = modul_312.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
