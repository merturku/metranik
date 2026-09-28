import { describe, it, expect } from "vitest";
import { modul_315 } from "./modul_315";

describe("Modül 315", () => {
  it("Test: 10 → 15", () => {
    const r = modul_315.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
