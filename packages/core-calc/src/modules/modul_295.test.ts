import { describe, it, expect } from "vitest";
import { modul_295 } from "./modul_295";

describe("Modül 295", () => {
  it("Test: 10 → 15", () => {
    const r = modul_295.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
