import { describe, it, expect } from "vitest";
import { havuzKlorDozaji, havuzKlorDozajiInputSchema } from "./havuz-klor-dozaji";

const havuz = {
  havuzHacmi_m3: 50,
  mevcutSerbestKlor_ppm: 0,
  hedefSerbestKlor_ppm: 2,
  urunAktifKlorIcerigi_gPerBirim: 650,
};

describe("Havuz Klor Dozajı", () => {
  it("50 m³, 0 → 2 ppm: 100 g aktif klor; %65 kalsiyum hipoklorit (650 g/kg) → 0,1538 kg = 153,8 g → uygun", () => {
    const r = havuzKlorDozaji.compute(havuz);
    expect(r.intermediates.gereken_aktif_klor_g).toBe(100);
    expect(r.value.urunMiktari_kgVeyaL).toBeCloseTo(0.153846, 6);
    expect(r.intermediates.urun_miktari_g_veya_mL).toBeCloseTo(153.846, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Sıvı %12,5 sodyum hipoklorit (125 g/L), 0,5 → 2 ppm: 75 g → 0,6 L", () => {
    const r = havuzKlorDozaji.compute({ ...havuz, mevcutSerbestKlor_ppm: 0.5, urunAktifKlorIcerigi_gPerBirim: 125 });
    expect(r.intermediates.gereken_aktif_klor_g).toBeCloseTo(75, 12);
    expect(r.value.urunMiktari_kgVeyaL).toBeCloseTo(0.6, 12);
  });

  it("Şok klorlama 10 ppm → sınırda; mevcut ≥ hedef → doz 0, uygun", () => {
    expect(havuzKlorDozaji.compute({ ...havuz, hedefSerbestKlor_ppm: 10 }).verdict?.status).toBe("sinirda");
    const yeterli = havuzKlorDozaji.compute({ ...havuz, mevcutSerbestKlor_ppm: 2.5 });
    expect(yeterli.value.urunMiktari_kgVeyaL).toBe(0);
    expect(yeterli.verdict?.status).toBe("uygun");
  });

  it("Aktif klor içeriği 1000 g/birimi aşamaz", () => {
    expect(havuzKlorDozajiInputSchema.safeParse({ ...havuz, urunAktifKlorIcerigi_gPerBirim: 1200 }).success).toBe(false);
  });
});
