import { describe, it, expect } from "vitest";
import { modul_251 } from "./modul_251";

describe("Modül 251", () => {
  it("Test: 10 → 15", () => {
    const r = modul_251.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
