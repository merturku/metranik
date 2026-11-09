import { describe, it, expect } from "vitest";
import { evAspiratorDebisi } from "./ev-aspirator-debisi";

describe("Aspiratör Debisi", () => {
  it("12 m³ banyo, 10 ACH → 120 m³/h (33,3 L/s); kanal payı 1,25 → katalog 150 m³/h (88,3 CFM)", () => {
    const r = evAspiratorDebisi.compute({ hacim_m3: 12, havaDegisimSayisi_ACH: 10, kanalKayipFaktoru: 1.25 });
    expect(r.value.gerekliDebi_m3h).toBe(120);
    expect(r.intermediates.debi_Ls as number).toBeCloseTo(33.333, 3);
    expect(r.intermediates.katalog_debisi_kayip_payli_m3h as number).toBeCloseTo(150, 8);
    expect(r.intermediates.katalog_debisi_CFM as number).toBeCloseTo(88.29, 1);
  });
  it("ACH 2 katına → debi 2 katı", () => {
    expect(evAspiratorDebisi.compute({ hacim_m3: 30, havaDegisimSayisi_ACH: 30, kanalKayipFaktoru: 1 }).value.gerekliDebi_m3h).toBe(900);
  });
});
