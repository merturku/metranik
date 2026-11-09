import { describe, it, expect } from "vitest";
import { betonAdyabatikSicaklikArtisi } from "./beton-adyabatik-sicaklik-artisi";

const g = { cimentoDozaji_kgm3: 350, hidratasyonIsisi_kJkg: 370, betonYogunlugu_kgm3: 2400, ozgulIsi_kJkgK: 1.0, tazeBetonSicakligi_C: 20, izinVerilenMaksSicaklik_C: 70 };

describe("Beton Adyabatik Sıcaklık Artışı", () => {
  it("350 kg/m³ × 370 kJ/kg = 129 500 kJ/m³; ÷ (2400·1,0) = 53,96 K; Tmaks = 73,96 °C", () => {
    const r = betonAdyabatikSicaklikArtisi.compute(g);
    expect(r.value.adyabatikArtis_K).toBeCloseTo(53.958, 2);
    expect(r.intermediates.adyabatik_maks_sicaklik_C as number).toBeCloseTo(73.958, 2);
  });
  it("limit 70 °C: 73,96 → sınırda (≤ +5); limit 65 → uygunsuz; limit 80 → uygun", () => {
    expect(betonAdyabatikSicaklikArtisi.compute(g).verdict?.status).toBe("sinirda");
    expect(betonAdyabatikSicaklikArtisi.compute({ ...g, izinVerilenMaksSicaklik_C: 65 }).verdict?.status).toBe("uygunsuz");
    expect(betonAdyabatikSicaklikArtisi.compute({ ...g, izinVerilenMaksSicaklik_C: 80 }).verdict?.status).toBe("uygun");
  });
  it("dozaj yarıya inince ΔT yarıya iner", () => {
    expect(betonAdyabatikSicaklikArtisi.compute({ ...g, cimentoDozaji_kgm3: 175 }).value.adyabatikArtis_K).toBeCloseTo(26.979, 2);
  });
});
