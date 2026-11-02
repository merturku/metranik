import { describe, it, expect } from "vitest";
import { nemAlmaCihaziKapasitesi } from "./nem-alma-cihazi-kapasitesi";

describe("Nem Alma Cihazı Kapasitesi", () => {
  const o = { odaHacmi_m3: 100, havaDegisimSayisi: 0.5, sicaklik_C: 20, mevcutBagilNem: 60, hedefBagilNem: 45, icNemUretimi_kggun: 2 };
  it("20 °C, %60 → W ≈ 8,7 g/kg; %45 → W ≈ 6,5 g/kg (psikrometrik diyagram değerleri)", () => {
    const r = nemAlmaCihaziKapasitesi.compute(o);
    expect(r.intermediates.W_mevcut_gkg as number).toBeCloseTo(8.7, 0);
    expect(r.intermediates.W_hedef_gkg as number).toBeCloseTo(6.5, 0);
  });
  it("hava ile giren: 100·0,5·24·1,2·(ΔW ≈ 2,2 g/kg) ≈ 3,2 kg/gün; toplam ≈ 5,2 kg/gün", () => {
    const r = nemAlmaCihaziKapasitesi.compute(o);
    expect(r.intermediates.hava_ile_giren_nem_kggun as number).toBeCloseTo(3.2, 0);
    expect(r.value.gunlukNemYuku_kg).toBeCloseTo(5.2, 0);
  });
  it("hedef ≥ mevcut reddedilir", () => {
    expect(nemAlmaCihaziKapasitesi.inputSchema.safeParse({ ...o, hedefBagilNem: 60 }).success).toBe(false);
  });
});
