import { describe, it, expect } from "vitest";
import { ucFazDengesizNotrAkimi } from "./uc-faz-dengesiz-notr-akimi";

describe("Üç Faz Dengesiz Yük Nötr Akımı", () => {
  it("100/80/60 A: IN = √1200 = 34,64 A", () => {
    const r = ucFazDengesizNotrAkimi.compute({ akimL1_A: 100, akimL2_A: 80, akimL3_A: 60, notrKapasitesi_A: 0 });
    expect(r.value.notrAkimi_A).toBeCloseTo(34.641, 3);
    expect(r.verdict).toBeUndefined();
  });

  it("dengeli yük → IN = 0", () => {
    expect(ucFazDengesizNotrAkimi.compute({ akimL1_A: 50, akimL2_A: 50, akimL3_A: 50, notrKapasitesi_A: 0 }).value.notrAkimi_A).toBeCloseTo(0, 9);
  });

  it("tek faz yüklü → IN = o faz akımı", () => {
    expect(ucFazDengesizNotrAkimi.compute({ akimL1_A: 40, akimL2_A: 0, akimL3_A: 0, notrKapasitesi_A: 0 }).value.notrAkimi_A).toBeCloseTo(40, 9);
  });

  it("dengesizlik % ve kapasite karşılaştırması", () => {
    const r = ucFazDengesizNotrAkimi.compute({ akimL1_A: 100, akimL2_A: 80, akimL3_A: 60, notrKapasitesi_A: 30 });
    expect(r.intermediates.faz_akimi_dengesizligi_yuzde).toBeCloseTo(25, 9);
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(ucFazDengesizNotrAkimi.compute({ akimL1_A: 100, akimL2_A: 80, akimL3_A: 60, notrKapasitesi_A: 50 }).verdict?.status).toBe("uygun");
  });
});
