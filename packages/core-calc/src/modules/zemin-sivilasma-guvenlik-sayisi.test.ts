import { describe, it, expect } from "vitest";
import { zeminSivilasmaGuvenlikSayisi, zeminSivilasmaGuvenlikSayisiInputSchema } from "./zemin-sivilasma-guvenlik-sayisi";

const kum = {
  maksYerIvmesi_g: 0.3,
  depremBuyuklugu_Mw: 7.5,
  derinlik_z_m: 5,
  yeraltiSuyuDerinligi_m: 2,
  dogalBirimHacimAgirlik_kNm3: 19,
  doygunBirimHacimAgirlik_kNm3: 19,
  sptN1_60cs: 15,
  kSigmaUssu_f: 0.7,
  gerekliGuvenlikSayisi: 1.1,
};

describe("Zemin Sıvılaşma Güvenlik Sayısı (SPT)", () => {
  it("Youd vd. (2001) taban eğrisi: (N1)60cs = 10, 15, 20, 25 → CRR7,5 = 0,113; 0,160; 0,215; 0,292", () => {
    const beklenen: [number, number][] = [
      [10, 0.1131],
      [15, 0.1601],
      [20, 0.2154],
      [25, 0.2919],
    ];
    for (const [N, crr] of beklenen) {
      const r = zeminSivilasmaGuvenlikSayisi.compute({ ...kum, sptN1_60cs: N });
      expect(r.intermediates.direnc_orani_CRR75).toBeCloseTo(crr, 4);
    }
  });

  it("Idriss MSF = 10^2,24/Mw^2,56: Mw 6,0 → 1,77; 7,0 → 1,19; 7,5 → 1,00", () => {
    const msf = (Mw: number) =>
      zeminSivilasmaGuvenlikSayisi.compute({ ...kum, depremBuyuklugu_Mw: Mw }).intermediates.buyukluk_olcek_katsayisi_MSF;
    expect(msf(6)).toBeCloseTo(1.77, 2);
    expect(msf(7)).toBeCloseTo(1.19, 2);
    expect(msf(7.5)).toBeCloseTo(1.0, 2);
  });

  it("z = 5 m, YASS 2 m, γ = 19 kN/m³, amaks = 0,3g: σv = 95, σ'v = 65,57 kPa, rd = 0,9618, CSR = 0,2717; N = 15 → FS = 0,589 → uygunsuz", () => {
    const r = zeminSivilasmaGuvenlikSayisi.compute(kum);
    expect(r.intermediates.toplam_gerilme_sigmaV_kPa).toBeCloseTo(95, 9);
    expect(r.intermediates.efektif_gerilme_sigmaVe_kPa).toBeCloseTo(65.57, 9);
    expect(r.intermediates.gerilme_azaltma_katsayisi_rd).toBeCloseTo(0.96175, 9);
    expect(r.intermediates.tekrarli_gerilme_orani_CSR).toBeCloseTo(0.27172, 4);
    expect(r.intermediates.efektif_gerilme_duzeltmesi_Ksigma).toBe(1);
    expect(r.value.guvenlikSayisi_FS).toBeCloseTo(0.5889, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Aynı zemin, Mw = 6,0: FS = 0,16006 × 1,7698 / 0,27172 = 1,043 → 1 ile 1,1 arası, sınırda", () => {
    const r = zeminSivilasmaGuvenlikSayisi.compute({ ...kum, depremBuyuklugu_Mw: 6 });
    expect(r.value.guvenlikSayisi_FS).toBeCloseTo(1.0425, 3);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("z = 12 m (rd = 1,174 − 0,0267×12 = 0,8536), γsat = 20: σ'v = 139,9 kPa > Pa → Kσ = 1,399^(−0,3) = 0,9042; N = 20 → FS = 0,688", () => {
    const r = zeminSivilasmaGuvenlikSayisi.compute({
      ...kum,
      derinlik_z_m: 12,
      doygunBirimHacimAgirlik_kNm3: 20,
      sptN1_60cs: 20,
    });
    expect(r.intermediates.efektif_gerilme_sigmaVe_kPa).toBeCloseTo(139.9, 9);
    expect(r.intermediates.gerilme_azaltma_katsayisi_rd).toBeCloseTo(0.8536, 9);
    expect(r.intermediates.efektif_gerilme_duzeltmesi_Ksigma).toBeCloseTo(0.90418, 4);
    expect(r.value.guvenlikSayisi_FS).toBeCloseTo(0.6876, 3);
  });

  it("(N1)60cs ≥ 30 veya su seviyesinin üstü: sıvılaşmaz, FS tanımsız; derinlik 30 m'yi aşamaz", () => {
    const siki = zeminSivilasmaGuvenlikSayisi.compute({ ...kum, sptN1_60cs: 32 });
    expect(siki.value.guvenlikSayisi_FS).toBeNull();
    expect(siki.verdict?.status).toBe("uygun");
    const kuru = zeminSivilasmaGuvenlikSayisi.compute({ ...kum, yeraltiSuyuDerinligi_m: 8 });
    expect(kuru.value.guvenlikSayisi_FS).toBeNull();
    expect(kuru.verdict?.status).toBe("uygun");
    expect(zeminSivilasmaGuvenlikSayisiInputSchema.safeParse({ ...kum, derinlik_z_m: 35 }).success).toBe(false);
  });
});
