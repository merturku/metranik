import { describe, it, expect } from "vitest";
import { modul_277 } from "./modul_277";

describe("Modül 277", () => {
  it("Test: 10 → 15", () => {
    const r = modul_277.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
