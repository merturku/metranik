import { describe, it, expect } from "vitest";
import { ahsapKirisEgilmeKontrolu, ahsapKirisEgilmeKontroluInputSchema } from "./ahsap-kiris-egilme-kontrolu";

const kiris = {
  dayanimSinifi: "C24" as const,
  genislik_b_mm: 100,
  yukseklik_h_mm: 200,
  tasarimMomenti_MEd_kNm: 6,
  yukSuresi: "orta" as const,
  servisSinifi: "1-2" as const,
  gammaM: 1.3,
};

describe("Ahşap Kiriş Eğilme Kontrolü", () => {
  it("C24, 100×200 mm, 6 kNm, orta süreli, SS1: W = 666,7 cm³, σ = 9,00 MPa; fm,d = 0,8×24/1,3 = 14,77 MPa → uygun", () => {
    const r = ahsapKirisEgilmeKontrolu.compute(kiris);
    expect(r.intermediates.mukavemet_momenti_W_cm3).toBeCloseTo(666.667, 3);
    expect(r.value.egilmeGerilmesi_MPa).toBeCloseTo(9, 9);
    expect(r.intermediates.boyut_katsayisi_kh).toBe(1);
    expect(r.intermediates.tasarim_egilme_dayanimi_fmd_MPa).toBeCloseTo(14.7692, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("80×120 mm, 3 kNm: σ = 15,63 MPa; kh = 1,25^0,2 = 1,0456 → fm,d = 15,44 MPa → uygunsuz; kısa süreli yükte (kmod 0,9) 17,37 MPa → uygun", () => {
    const kucuk = { ...kiris, genislik_b_mm: 80, yukseklik_h_mm: 120, tasarimMomenti_MEd_kNm: 3 };
    const r = ahsapKirisEgilmeKontrolu.compute(kucuk);
    expect(r.value.egilmeGerilmesi_MPa).toBeCloseTo(15.625, 9);
    expect(r.intermediates.boyut_katsayisi_kh).toBeCloseTo(1.04564, 5);
    expect(r.intermediates.tasarim_egilme_dayanimi_fmd_MPa).toBeCloseTo(15.4433, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
    const kisa = ahsapKirisEgilmeKontrolu.compute({ ...kucuk, yukSuresi: "kisa" });
    expect(kisa.intermediates.tasarim_egilme_dayanimi_fmd_MPa).toBeCloseTo(17.3737, 4);
    expect(kisa.verdict?.status).toBe("uygun");
  });

  it("Servis sınıfı 3, kalıcı yük: kmod = 0,50; çok sığ kesitte kh 1,3 ile sınırlı", () => {
    expect(ahsapKirisEgilmeKontrolu.compute({ ...kiris, servisSinifi: "3", yukSuresi: "kalici" }).intermediates.kmod).toBe(0.5);
    expect(ahsapKirisEgilmeKontrolu.compute({ ...kiris, yukseklik_h_mm: 30 }).intermediates.boyut_katsayisi_kh).toBe(1.3);
  });

  it("Bilinmeyen dayanım sınıfı reddedilir", () => {
    expect(ahsapKirisEgilmeKontroluInputSchema.safeParse({ ...kiris, dayanimSinifi: "C40" }).success).toBe(false);
  });
});
