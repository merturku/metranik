import { describe, it, expect } from "vitest";
import { modul_293 } from "./modul_293";

describe("Modül 293", () => {
  it("Test: 10 → 15", () => {
    const r = modul_293.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
