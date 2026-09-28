import { describe, it, expect } from "vitest";
import { modul_326 } from "./modul_326";

describe("Modül 326", () => {
  it("Test: 10 → 15", () => {
    const r = modul_326.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
