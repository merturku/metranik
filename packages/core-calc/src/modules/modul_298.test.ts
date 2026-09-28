import { describe, it, expect } from "vitest";
import { modul_298 } from "./modul_298";

describe("Modül 298", () => {
  it("Test: 10 → 15", () => {
    const r = modul_298.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
