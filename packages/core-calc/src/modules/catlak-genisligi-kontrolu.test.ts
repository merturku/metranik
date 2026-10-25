import { describe, it, expect } from "vitest";
import { catlakGenisligiKontrolu } from "./catlak-genisligi-kontrolu";

const kiris = {
  betonKarakteristikDayanim_fck_MPa: 30,
  kesitGenisligi_b_mm: 300,
  kesitYuksekligi_h_mm: 600,
  faydaliYukseklik_d_mm: 550,
  cekmeDonatisiAlani_As_mm2: 1206,
  cubukCapi_mm: 16,
  netPasPayi_c_mm: 40,
  cubukAraligi_mm: 50,
  yariKaliciMoment_kNm: 150,
  yukSuresi: "uzun" as const,
  izinVerilenCatlak_mm: 0.3,
};

describe("Çatlak Genişliği Kontrolü (TS EN 1992-1-1 §7.3.4)", () => {
  it("C30, 300×600, d = 550, 6Ø16, M = 150 kNm, uzun süreli: x = 141,4 mm, σs = 247,3 MPa, sr,max = 220,6 mm, wk = 0,225 mm → uygun", () => {
    const r = catlakGenisligiKontrolu.compute(kiris);
    expect(r.intermediates.modul_orani_alfa_e).toBeCloseTo(6.0908, 4);
    expect(r.intermediates.tarafsiz_eksen_x_mm).toBeCloseTo(141.446, 2);
    expect(r.intermediates.donati_gerilmesi_sigma_s_MPa).toBeCloseTo(247.346, 2);
    expect(r.intermediates.etkili_cekme_yuksekligi_hc_eff_mm).toBeCloseTo(125, 6);
    expect(r.intermediates.etkili_donati_orani_rho_p_eff).toBeCloseTo(0.03216, 5);
    expect(r.intermediates.birim_deformasyon_farki).toBeCloseTo(0.00102132, 7);
    expect(r.intermediates.azami_catlak_araligi_sr_max_mm).toBeCloseTo(220.577, 2);
    expect(r.value.catlakGenisligi_mm).toBeCloseTo(0.22528, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("4Ø16 = 804 mm²: σs = 365,5 MPa, wk = 0,400 mm > 0,3 mm → uygunsuz", () => {
    const r = catlakGenisligiKontrolu.compute({ ...kiris, cekmeDonatisiAlani_As_mm2: 804 });
    expect(r.intermediates.donati_gerilmesi_sigma_s_MPa).toBeCloseTo(365.499, 2);
    expect(r.value.catlakGenisligi_mm).toBeCloseTo(0.40009, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("M = 60 kNm: alt sınır 0,6·σs/Es = 0,000297 belirleyici, wk = 0,0655 mm", () => {
    const r = catlakGenisligiKontrolu.compute({ ...kiris, yariKaliciMoment_kNm: 60 });
    expect(r.intermediates.birim_deformasyon_farki).toBeCloseTo(0.00029681, 7);
    expect(r.value.catlakGenisligi_mm).toBeCloseTo(0.06547, 4);
  });

  it("Çubuk aralığı 300 mm > 5·(40 + 8) = 240 mm: sr,max = 1,3·(600 − 141,446) = 596,1 mm, wk = 0,609 mm", () => {
    const r = catlakGenisligiKontrolu.compute({ ...kiris, cubukAraligi_mm: 300 });
    expect(r.intermediates.azami_catlak_araligi_sr_max_mm).toBeCloseTo(596.12, 1);
    expect(r.value.catlakGenisligi_mm).toBeCloseTo(0.6088, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
