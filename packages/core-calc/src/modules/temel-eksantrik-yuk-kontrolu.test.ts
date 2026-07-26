import { describe, expect, it } from "vitest";
import { temelEksantrikYukKontrolu } from "./temel-eksantrik-yuk-kontrolu";

describe("temelEksantrikYukKontrolu", () => {
  it("N=800kN, M=200kNm, L=3m, B=2m, qadm=250kPa → qmax=200kPa, uygun", () => {
    const r = temelEksantrikYukKontrolu.compute({
      eksenelYuk_N_kN: 800,
      moment_M_kNm: 200,
      temelUzunlugu_L_m: 3,
      temelGenisligi_B_m: 2,
      izinVerilenTasimaGucu_qadm_kPa: 250,
    });
    expect(r.value.maksimumGerilme_qmax_kPa).toBeCloseTo(200, 2);
    expect(r.intermediates.disMerkezlik_e_m).toBeCloseTo(0.25, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("dışmerkezlik L/6'yı aşarsa uygunsuz döner", () => {
    const r = temelEksantrikYukKontrolu.compute({
      eksenelYuk_N_kN: 800,
      moment_M_kNm: 500,
      temelUzunlugu_L_m: 3,
      temelGenisligi_B_m: 2,
      izinVerilenTasimaGucu_qadm_kPa: 250,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
