import { describe, it, expect } from "vitest";
import { sicakSuGelmeSuresi } from "./sicak-su-gelme-suresi";

describe("Sıcak Su Gelme Süresi", () => {
  const g = { boruIcCapi_mm: 16, boruUzunlugu_m: 20, musluk_debisi_Ldk: 6, gunlukKullanimSayisi: 10, suBirimFiyati_TLm3: 50, izinVerilenSure_s: 30 };
  it("Ø16 × 20 m = 4,0212 L; 6 L/dk → 40,2 s; yıllık 14,68 m³, 733,9 TL", () => {
    const r = sicakSuGelmeSuresi.compute(g);
    expect(r.intermediates.boru_ici_hacim_L as number).toBeCloseTo(4.021239, 5);
    expect(r.value.gelmeSuresi_s).toBeCloseTo(40.21239, 4);
    expect(r.intermediates.yillik_bosa_giden_su_m3 as number).toBeCloseTo(14.67752, 4);
    expect(r.intermediates.yillik_maliyet_TL as number).toBeCloseTo(733.876, 2);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("izin 45 s uygun; 10 s uygunsuz; debi iki katına çıkınca süre yarıya iner", () => {
    expect(sicakSuGelmeSuresi.compute({ ...g, izinVerilenSure_s: 45 }).verdict?.status).toBe("uygun");
    expect(sicakSuGelmeSuresi.compute({ ...g, izinVerilenSure_s: 10 }).verdict?.status).toBe("uygunsuz");
    expect(sicakSuGelmeSuresi.compute({ ...g, musluk_debisi_Ldk: 12 }).value.gelmeSuresi_s).toBeCloseTo(20.10619, 4);
  });
});
