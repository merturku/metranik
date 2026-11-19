import { describe, it, expect } from "vitest";
import { zeminMohrCoulombKirilmaGerilmesi } from "./zemin-mohr-coulomb-kirilma-gerilmesi";

describe("Zemin Mohr-Coulomb", () => {
  const g = { kohezyon_kPa: 20, icSurtunmeAcisi_derece: 30, yanalGerilme_kPa: 100, uygulananDusey_kPa: 250, gerekliFS: 1.3 };
  it("c=20, φ=30°, σ3=100: Nφ=3; σ1f = 300 + 40√3 = 369,28 kPa", () => {
    const r = zeminMohrCoulombKirilmaGerilmesi.compute(g);
    expect(r.intermediates.N_phi as number).toBeCloseTo(3, 10);
    expect(r.value.kirilmaDuseyGerilmesi_kPa).toBeCloseTo(300 + 40 * Math.sqrt(3), 8);
    expect(r.intermediates.kirilma_duzlemi_acisi_derece as number).toBeCloseTo(60, 8);
    expect(r.intermediates.guvenlik_sayisi as number).toBeCloseTo(1.4771, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("kırılma düzleminde τ = c + σn·tanφ (bağımsız çapraz kontrol)", () => {
    const r = zeminMohrCoulombKirilmaGerilmesi.compute(g);
    expect(r.intermediates.kirilma_duzleminde_kayma_dayanimi_kPa as number).toBeCloseTo(r.intermediates.c_artı_sigma_tanphi_kontrol_kPa as number, 8);
    expect(r.intermediates.kirilma_duzleminde_normal_gerilme_kPa as number).toBeCloseTo(167.3205, 3);
  });
  it("φ = 0 (doygun kil): σ1f = σ3 + 2c; uygulanan yük aşarsa uygunsuz", () => {
    const r = zeminMohrCoulombKirilmaGerilmesi.compute({ ...g, icSurtunmeAcisi_derece: 0, uygulananDusey_kPa: 200 });
    expect(r.value.kirilmaDuseyGerilmesi_kPa).toBeCloseTo(140, 8);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
