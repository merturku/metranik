import { describe, it, expect } from "vitest";
import { evSapMalzemeMiktari } from "./ev-sap-malzeme-miktari";

describe("Şap Malzeme Miktarı", () => {
  it("50 m², 5 cm, %5 fire: V = 2,625 m³; 350 kg/m³ → 918,75 kg = 19 torba; s/ç 0,5 → 459,4 L", () => {
    const r = evSapMalzemeMiktari.compute({ alan_m2: 50, kalinlik_cm: 5, cimentoDozaji_kgm3: 350, firePayi: 0.05, suCimentoOrani: 0.5 });
    expect(r.value.sapHacmi_m3).toBeCloseTo(2.625, 10);
    expect(r.intermediates.cimento_kg as number).toBeCloseTo(918.75, 8);
    expect(r.intermediates.cimento_torba_50kg).toBe(19);
    expect(r.intermediates.karisim_suyu_L as number).toBeCloseTo(459.375, 8);
  });
  it("tam katı torba sayısı yukarı yuvarlanmaz (1000 kg = 20 torba)", () => {
    const r = evSapMalzemeMiktari.compute({ alan_m2: 10, kalinlik_cm: 10, cimentoDozaji_kgm3: 1000, firePayi: 0, suCimentoOrani: 0.5 });
    expect(r.intermediates.cimento_torba_50kg).toBe(20);
  });
});
