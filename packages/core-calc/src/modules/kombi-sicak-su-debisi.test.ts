import { describe, it, expect } from "vitest";
import { kombiSicakSuDebisi, kombiSicakSuDebisiInputSchema } from "./kombi-sicak-su-debisi";

const kombi24 = {
  sicakSuGucu_kW: 24,
  sebekeSuyuSicakligi_C: 10,
  kullanimSicakligi_C: 40,
  dusDebisi_Ldk: 8,
  esZamanliDusSayisi: 1,
};

describe("Kombi / Ani Su Isıtıcı Sıcak Su Debisi", () => {
  it("24 kW, 10 → 40 °C (ΔT = 30 K): ṁ = 24/(4,186×30) = 0,1911 kg/s = 11,47 L/dk (katalogdaki ≈ 11,5 L/dk); 1,43 duş → uygun", () => {
    const r = kombiSicakSuDebisi.compute(kombi24);
    expect(r.value.sicakSuDebisi_Ldk).toBeCloseTo(11.4668, 4);
    expect(r.intermediates.spesifik_debi_dT30_Ldk).toBeCloseTo(11.4668, 4);
    expect(r.intermediates.karsilanan_dus_sayisi).toBeCloseTo(1.43335, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("İki eşzamanlı duş (16 L/dk): su ancak 10 + 24/(4,186×16/60) = 31,5 °C'ye ısınır → uygunsuz", () => {
    const r = kombiSicakSuDebisi.compute({ ...kombi24, esZamanliDusSayisi: 2 });
    expect(r.intermediates.gereken_debi_Ldk).toBe(16);
    expect(r.intermediates.gereken_debide_ulasilan_sicaklik_C).toBeCloseTo(31.5002, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Kışın şebeke suyu 5 °C, 40 °C kullanım: debi 24×60/(4,186×35) = 9,83 L/dk", () => {
    const r = kombiSicakSuDebisi.compute({ ...kombi24, sebekeSuyuSicakligi_C: 5 });
    expect(r.value.sicakSuDebisi_Ldk).toBeCloseTo(9.8287, 4);
  });

  it("Kullanım sıcaklığı şebeke suyundan düşükse girdi reddedilir", () => {
    expect(kombiSicakSuDebisiInputSchema.safeParse({ ...kombi24, kullanimSicakligi_C: 8 }).success).toBe(false);
  });
});
