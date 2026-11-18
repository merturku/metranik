import { describe, it, expect } from "vitest";
import { istinatDuvariYanalBasincSurjTabanSuyu } from "./istinat-duvari-yanal-basinc-surj-taban-suyu";

describe("İstinat Duvarı Yanal Basıncı (Sürşarj + Taban Suyu)", () => {
  const g = { yukseklik_m: 5, birimAgirlik_kNm3: 18, batikBirimAgirlik_kNm3: 20, phi_deg: 30, surj_kPa: 10, suDerinligi_m: 0 };
  it("su yok: Ka = 1/3; P = 16,667 + 75 = 91,667 kN/m; etki yüksekliği 1,818 m", () => {
    const r = istinatDuvariYanalBasincSurjTabanSuyu.compute(g);
    expect(r.intermediates.ka as number).toBeCloseTo(1 / 3, 10);
    expect(r.value.toplamItme_kNm).toBeCloseTo(91.6667, 3);
    expect(r.intermediates.etki_yuksekligi_m as number).toBeCloseTo(1.81818, 4);
  });
  it("sürşarj yok, su yok: klasik ½·Ka·γ·H² = 75 kN/m, H/3 = 1,667 m", () => {
    const r = istinatDuvariYanalBasincSurjTabanSuyu.compute({ ...g, surj_kPa: 0 });
    expect(r.value.toplamItme_kNm).toBeCloseTo(75, 8);
    expect(r.intermediates.etki_yuksekligi_m as number).toBeCloseTo(5 / 3, 8);
  });
  it("taban suyu 2 m: P = 106,08 kN/m (su 19,62 kN/m), etki yüksekliği 1,6617 m", () => {
    const r = istinatDuvariYanalBasincSurjTabanSuyu.compute({ ...g, suDerinligi_m: 2 });
    expect(r.value.toplamItme_kNm).toBeCloseTo(106.08, 2);
    expect(r.intermediates.su_itmesi_kNm as number).toBeCloseTo(19.62, 8);
    expect(r.intermediates.etki_yuksekligi_m as number).toBeCloseTo(1.66172, 4);
  });
  it("tabandaki basınç, alan integralinin üst sınırı ile tutarlı (P ≤ H·σtaban)", () => {
    const r = istinatDuvariYanalBasincSurjTabanSuyu.compute({ ...g, suDerinligi_m: 2 });
    expect(r.value.toplamItme_kNm).toBeLessThan(5 * (r.intermediates.tabanda_basinc_kPa as number));
  });
  it("su derinliği duvar yüksekliğini aşarsa reddedilir", () => {
    expect(istinatDuvariYanalBasincSurjTabanSuyu.inputSchema.safeParse({ ...g, suDerinligi_m: 6 }).success).toBe(false);
  });
});
