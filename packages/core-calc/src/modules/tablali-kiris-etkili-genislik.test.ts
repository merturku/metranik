import { describe, it, expect } from "vitest";
import { tablaliKirisEtkiliGenislik, tablaliKirisEtkiliGenislikInputSchema } from "./tablali-kiris-etkili-genislik";

// 4 m aralıklı kirişler, bw = 300 mm → her iki yanda bi = (4000 − 300)/2 = 1850 mm.
const tKiris = {
  govdeGenisligi_bw_mm: 300,
  solTablaGenisligi_b1_mm: 1850,
  sagTablaGenisligi_b2_mm: 1850,
  aciklik_L_m: 6,
  aciklikTipi: "uc" as const,
};

describe("Tablalı (T/L) Kiriş Etkili Tabla Genişliği", () => {
  it("Uç açıklık L = 6 m: l0 = 5100 mm, beff,i = 0,2×1850 + 0,1×5100 = 880 mm (≤ 1020, ≤ 1850) → beff = 2×880 + 300 = 2060 mm", () => {
    const r = tablaliKirisEtkiliGenislik.compute(tKiris);
    expect(r.intermediates.moment_sifir_noktalari_arasi_l0_mm).toBeCloseTo(5100, 9);
    expect(r.intermediates.sol_etkili_kanat_beff1_mm).toBeCloseTo(880, 9);
    expect(r.value.etkiliTablaGenisligi_mm).toBeCloseTo(2060, 9);
  });

  it("İç açıklık: l0 = 4200, beff,i = 370 + 420 = 790 → 1880 mm; L kiriş (b2 = 0, uç açıklık) → 880 + 300 = 1180 mm", () => {
    expect(tablaliKirisEtkiliGenislik.compute({ ...tKiris, aciklikTipi: "ic" }).value.etkiliTablaGenisligi_mm).toBeCloseTo(1880, 9);
    expect(tablaliKirisEtkiliGenislik.compute({ ...tKiris, sagTablaGenisligi_b2_mm: 0 }).value.etkiliTablaGenisligi_mm).toBeCloseTo(1180, 9);
  });

  it("Sınırlar: geniş tablada 0,2·l0 = 1020 mm, dar tablada bi'nin kendisi belirleyici", () => {
    const genis = tablaliKirisEtkiliGenislik.compute({ ...tKiris, solTablaGenisligi_b1_mm: 5000 });
    expect(genis.intermediates.sol_etkili_kanat_beff1_mm).toBeCloseTo(1020, 9);
    const dar = tablaliKirisEtkiliGenislik.compute({ ...tKiris, solTablaGenisligi_b1_mm: 300 });
    expect(dar.intermediates.sol_etkili_kanat_beff1_mm).toBe(300);
  });

  it("Gövde genişliği sıfır olamaz", () => {
    expect(tablaliKirisEtkiliGenislikInputSchema.safeParse({ ...tKiris, govdeGenisligi_bw_mm: 0 }).success).toBe(false);
  });
});
