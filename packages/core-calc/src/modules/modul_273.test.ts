import { describe, it, expect } from "vitest";
import { modul_273 } from "./modul_273";

describe("Modül 273", () => {
  it("Test: 10 → 15", () => {
    const r = modul_273.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
