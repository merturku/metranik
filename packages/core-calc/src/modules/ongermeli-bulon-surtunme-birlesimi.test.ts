import { describe, it, expect } from "vitest";
import { ongermeliBulonSurtunmeBirlesimi } from "./ongermeli-bulon-surtunme-birlesimi";

describe("Öngerilmeli Bulon Sürtünme Birleşimi", () => {
  const g = { bulonSinifi: "8.8" as const, gerilmeAlani_As_mm2: 157, bulonAdedi: 4, surtunmeYuzeyi_n: 1, yuzeySinifi: "B" as const, delikTipi_ks: "1.0" as const, gammaM3: "1.25" as const, bulonCekmesi_Ft_kN: 0, tasarimKesme_Ved_kN: 90 };
  it("M16 8.8 (As 157): Fp,C = 87,92 kN; Fs,Rd = 0,4/1,25·87,92 = 28,134 kN/bulon; 4 bulon 112,54 kN; 90 kN → 0,80 uygun", () => {
    const r = ongermeliBulonSurtunmeBirlesimi.compute(g);
    expect(r.intermediates.Fp_C_kN as number).toBeCloseTo(87.92, 6);
    expect(r.intermediates.bulon_basina_FsRd_kN as number).toBeCloseTo(28.1344, 4);
    expect(r.value.birlesimKayma_FsRd_kN).toBeCloseTo(112.5376, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("iki sürtünme yüzeyi kapasiteyi ikiye katlar", () => {
    const a = ongermeliBulonSurtunmeBirlesimi.compute(g).value.birlesimKayma_FsRd_kN;
    expect(ongermeliBulonSurtunmeBirlesimi.compute({ ...g, surtunmeYuzeyi_n: 2 }).value.birlesimKayma_FsRd_kN).toBeCloseTo(2 * a, 8);
  });
  it("Ft = 20 kN: (87,92 − 16)·0,32 = 23,0144 kN/bulon", () => {
    const r = ongermeliBulonSurtunmeBirlesimi.compute({ ...g, bulonCekmesi_Ft_kN: 20 });
    expect(r.intermediates.bulon_basina_FsRd_kN as number).toBeCloseTo(23.0144, 4);
  });
  it("öngerme tükenirse (Ft = 110 kN) kapasite 0 ve uygunsuz; Ved 120 kN → uygunsuz", () => {
    const r = ongermeliBulonSurtunmeBirlesimi.compute({ ...g, bulonCekmesi_Ft_kN: 110 });
    expect(r.value.birlesimKayma_FsRd_kN).toBe(0);
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(ongermeliBulonSurtunmeBirlesimi.compute({ ...g, tasarimKesme_Ved_kN: 120 }).verdict?.status).toBe("uygunsuz");
  });
});
