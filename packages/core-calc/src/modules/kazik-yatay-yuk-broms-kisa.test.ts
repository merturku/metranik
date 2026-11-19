import { describe, it, expect } from "vitest";
import { kazikYatayYukBromsKisa } from "./kazik-yatay-yuk-broms-kisa";

describe("Kazık Yatay Yük (Broms kısa)", () => {
  const g = { capD_m: 0.5, boyL_m: 4, yukYuksekligiE_m: 0.5, zeminBirimHacimAgirligi_kNm3: 18, icSurtunmeAcisi_derece: 30, guvenlikSayisi: 2.5, tasarimYatayYuk_kN: 60 };
  it("φ=30° (Kp=3), γ=18, D=0,5, L=4, e=0,5: Hu = 192 kN", () => {
    const r = kazikYatayYukBromsKisa.compute(g);
    expect(r.intermediates.Kp_pasif_katsayi as number).toBeCloseTo(3, 10);
    expect(r.value.sinirYatayYuk_kN).toBeCloseTo(192, 6);
    expect(r.intermediates.izin_yatay_yuk_kN as number).toBeCloseTo(76.8, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("kazık ucuna göre moment dengesi: Hu(e+L) = 0,5KpγDL³", () => {
    const r = kazikYatayYukBromsKisa.compute(g);
    expect(r.value.sinirYatayYuk_kN * 4.5).toBeCloseTo(0.5 * 3 * 18 * 0.5 * 64, 6);
  });
  it("sıfır kesme derinliği f = √(Hu/(1,5KpγD)) ve Mmaks = Hu(e+2f/3)", () => {
    const r = kazikYatayYukBromsKisa.compute(g);
    const f = Math.sqrt(192 / 40.5);
    expect(r.intermediates.sifir_kesme_derinligi_f_m as number).toBeCloseTo(f, 8);
    expect(r.intermediates.maks_moment_kNm as number).toBeCloseTo(192 * (0.5 + (2 * f) / 3), 6);
  });
  it("yük izin değeri aşarsa uygunsuz", () => {
    expect(kazikYatayYukBromsKisa.compute({ ...g, tasarimYatayYuk_kN: 100 }).verdict?.status).toBe("uygunsuz");
  });
});
