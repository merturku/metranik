import { describe, it, expect } from "vitest";
import { modul_324 } from "./modul_324";

describe("Modül 324", () => {
  it("Test: 10 → 15", () => {
    const r = modul_324.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
