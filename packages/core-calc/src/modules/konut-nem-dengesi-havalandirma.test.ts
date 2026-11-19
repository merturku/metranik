import { describe, it, expect } from "vitest";
import { konutNemDengesiHavalandirma } from "./konut-nem-dengesi-havalandirma";

describe("Konut Nem Dengesi", () => {
  const g = { nemUretimi_kggun: 10, icSicaklik_C: 20, icBagilNem: 0.6, disSicaklik_C: 5, disBagilNem: 0.8, odaHacmi_m3: 300, havaYogunlugu_kgm3: 1.2 };
  it("20 °C %60 iç ≈ 8,7 g/kg (psikrometrik diyagram); dış 5 °C %80 ≈ 4,3 g/kg", () => {
    const r = konutNemDengesiHavalandirma.compute(g);
    expect(r.intermediates.ic_mutlak_nem_gkg as number).toBeCloseTo(8.7, 1);
    expect(r.intermediates.dis_mutlak_nem_gkg as number).toBeCloseTo(4.3, 1);
  });
  it("nem dengesi: V̇·ρ·Δx = G ve V̇ ≈ 79 m³/h", () => {
    const r = konutNemDengesiHavalandirma.compute(g);
    expect(r.intermediates.denge_kontrol_gh as number).toBeCloseTo(10000 / 24, 8);
    expect(r.value.gerekliDebi_m3h as number).toBeGreaterThan(70);
    expect(r.value.gerekliDebi_m3h as number).toBeLessThan(90);
    expect(r.intermediates.hava_degisim_sayisi_1h as number).toBeCloseTo((r.value.gerekliDebi_m3h as number) / 300, 10);
  });
  it("dış hava iç hedeften nemliyse null + uygunsuz", () => {
    const r = konutNemDengesiHavalandirma.compute({ ...g, disSicaklik_C: 28, disBagilNem: 0.9 });
    expect(r.value.gerekliDebi_m3h).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
