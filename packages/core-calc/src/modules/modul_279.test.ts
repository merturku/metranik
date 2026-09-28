import { describe, it, expect } from "vitest";
import { modul_279 } from "./modul_279";

describe("Modül 279", () => {
  it("Test: 10 → 15", () => {
    const r = modul_279.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
