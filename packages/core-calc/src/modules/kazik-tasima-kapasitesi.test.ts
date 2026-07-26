import { describe, expect, it } from "vitest";
import { kazikTasimaKapasitesi } from "./kazik-tasima-kapasitesi";

describe("kazikTasimaKapasitesi", () => {
  it("D=0.4m, L=10m, qp=1500 kPa, fs=50 kPa, FS=2.5 → Qa≈326.7 kN", () => {
    const r = kazikTasimaKapasitesi.compute({
      kazikCapi_D_m: 0.4,
      kazikBoyu_L_m: 10,
      ucTasimaDirenci_qp_kPa: 1500,
      cevreSurtunmeDirenci_fs_kPa: 50,
      guvenlikKatsayisi_FS: 2.5,
    });
    expect(r.value.izinVerilenKapasite_Qa_kN).toBeCloseTo(326.7256, 2);
  });
});
