import { describe, it, expect } from "vitest";
import { havaFiltresiBasincKaybiEnerjiMaliyeti } from "./hava-filtresi-basinc-kaybi-enerji-maliyeti";

describe("Hava Filtresi Basınç Kaybı Enerji Maliyeti", () => {
  const g = { debi_m3h: 10000, temizDp_Pa: 100, kirliDp_Pa: 250, fanVerimi: 0.6, yillikSaat_h: 6000, elektrikFiyati_TLkWh: 4, filtreAdedi: 6, filtreBirimFiyati_TL: 1500, yilda_degisim: 2 };
  it("10 000 m³/h, 100→250 Pa, η 0,6: P = 810,19 W; 4861,1 kWh; 19 444 ₺ + filtre 18 000 ₺", () => {
    const r = havaFiltresiBasincKaybiEnerjiMaliyeti.compute(g);
    expect(r.intermediates.ortalama_dp_Pa as number).toBeCloseTo(175, 10);
    expect(r.intermediates.ek_fan_gucu_W as number).toBeCloseTo(810.185, 2);
    expect(r.value.yillikEnerji_kWh).toBeCloseTo(4861.111, 2);
    expect(r.intermediates.yillik_enerji_maliyeti_TL as number).toBeCloseTo(19444.44, 1);
    expect(r.intermediates.toplam_yillik_maliyet_TL as number).toBeCloseTo(37444.44, 1);
  });
  it("Δp ve debi iki katına çıkınca enerji dört kat", () => {
    const a = havaFiltresiBasincKaybiEnerjiMaliyeti.compute(g).value.yillikEnerji_kWh;
    const b = havaFiltresiBasincKaybiEnerjiMaliyeti.compute({ ...g, debi_m3h: 20000, temizDp_Pa: 200, kirliDp_Pa: 500 }).value.yillikEnerji_kWh;
    expect(b / a).toBeCloseTo(4, 10);
  });
  it("kirli Δp < temiz Δp reddedilir", () => {
    expect(havaFiltresiBasincKaybiEnerjiMaliyeti.inputSchema.safeParse({ ...g, kirliDp_Pa: 50 }).success).toBe(false);
  });
});
