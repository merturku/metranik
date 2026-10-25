import { describe, it, expect } from "vitest";
import { gesPanelSiraArasiMesafe } from "./ges-panel-sira-arasi-mesafe";

const ankara = {
  panelEgikUzunlugu_L_m: 2,
  egimAcisi_beta_derece: 30,
  enlem_derece: 39.9,
  golgesizSaatAraligi: "12" as const,
};

describe("GES Panel Sıra Arası Mesafe (Gölgelenme)", () => {
  it("Ankara φ = 39,9°, L = 2 m, β = 30°, öğle: α = 90 − 39,9 − 23,45 = 26,65°; gölge 1/tan 26,65° = 1,993 m; aralık 1,732 + 1,993 = 3,725 m", () => {
    const r = gesPanelSiraArasiMesafe.compute(ankara);
    expect(r.intermediates.gunes_yukseklik_acisi_derece).toBeCloseTo(26.65, 6);
    expect(r.intermediates.gunes_azimutu_guneyden_derece).toBeCloseTo(0, 4);
    expect(r.intermediates.panel_ust_kenar_yuksekligi_m).toBeCloseTo(1, 6);
    expect(r.intermediates.siralar_arasi_bosluk_m).toBeCloseTo(1.9926, 4);
    expect(r.value.siraAraligi_m).toBeCloseTo(3.7247, 4);
  });

  it("10:00–14:00 gölgesiz (ω = 30°): α = 20,75°, azimut 29,37°, bosluk 2,300 m, aralık 4,032 m", () => {
    const r = gesPanelSiraArasiMesafe.compute({ ...ankara, golgesizSaatAraligi: "10-14" });
    expect(r.intermediates.gunes_yukseklik_acisi_derece).toBeCloseTo(20.747, 3);
    expect(r.intermediates.gunes_azimutu_guneyden_derece).toBeCloseTo(29.374, 3);
    expect(r.intermediates.siralar_arasi_bosluk_m).toBeCloseTo(2.3004, 4);
    expect(r.value.siraAraligi_m).toBeCloseTo(4.0325, 4);
  });
});
