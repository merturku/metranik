import { describe, expect, it } from "vitest";
import { temelTasimaKapasitesiMeyerhof } from "./temel-tasima-kapasitesi-meyerhof";

describe("temel-tasima-kapasitesi-meyerhof", () => {
  it("c=20kPa, q=18kPa, γ=18kN/m³, B=2m, Nc=17.69/Nq=7.44/Nγ=5.39 → ~584.74 kPa", () => {
    const r = temelTasimaKapasitesiMeyerhof.compute({
      kohezyon_c_kPa: 20,
      ustYukGerilmesi_q_kPa: 18,
      birimHacimAgirlik_gamma_kNm3: 18,
      temelGenisligi_B_m: 2,
      tasimaGucuKatsayisi_Nc: 17.69,
      tasimaGucuKatsayisi_Nq: 7.44,
      tasimaGucuKatsayisi_Ngamma: 5.39,
    });

    expect(r.intermediates.kohezyonTerimi_kPa).toBeCloseTo(353.8, 1);
    expect(r.intermediates.derinlikTerimi_kPa).toBeCloseTo(133.92, 2);
    expect(r.intermediates.genislikTerimi_kPa).toBeCloseTo(96.99, 1);
    expect(r.value.tasimaGucu_qu_kPa).toBeCloseTo(584.74, 1);
  });
});
