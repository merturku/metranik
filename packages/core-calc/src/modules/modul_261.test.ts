import { describe, it, expect } from "vitest";
import { modul_261 } from "./modul_261";

describe("Modül 261", () => {
  it("Test: 10 → 15", () => {
    const r = modul_261.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
