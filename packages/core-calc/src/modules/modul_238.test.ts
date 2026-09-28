import { describe, it, expect } from "vitest";
import { modul_238 } from "./modul_238";

describe("Modül 238", () => {
  it("Test: 10 → 15", () => {
    const r = modul_238.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
