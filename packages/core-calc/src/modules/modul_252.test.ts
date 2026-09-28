import { describe, it, expect } from "vitest";
import { modul_252 } from "./modul_252";

describe("Modül 252", () => {
  it("Test: 10 → 15", () => {
    const r = modul_252.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
