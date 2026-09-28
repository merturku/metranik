import { describe, it, expect } from "vitest";
import { modul_321 } from "./modul_321";

describe("Modül 321", () => {
  it("Test: 10 → 15", () => {
    const r = modul_321.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
