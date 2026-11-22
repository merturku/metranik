import { describe, it, expect } from "vitest";
import { motorKaymaRotorKayiplari } from "./motor-kayma-rotor-kayiplari";

describe("Motor Kayması ve Rotor Kayıpları", () => {
  const g = { frekans_Hz: 50, kutupSayisi: 4, devir_rpm: 1470, milGucu_kW: 11 };
  it("50 Hz, 4 kutup, 1470 rpm: ns 1500, s %2, rotor 1 Hz, Pag 11,2245, Pcu2 0,2245 kW", () => {
    const r = motorKaymaRotorKayiplari.compute(g);
    expect(r.intermediates.senkron_devir_rpm).toBe(1500);
    expect(r.value.kayma_yuzde).toBeCloseTo(2, 10);
    expect(r.intermediates.rotor_frekansi_Hz as number).toBeCloseTo(1, 10);
    expect(r.intermediates.hava_araligi_gucu_kW as number).toBeCloseTo(11.2245, 4);
    expect(r.intermediates.rotor_bakir_kaybi_kW as number).toBeCloseTo(0.22449, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("güç dengesi: Pag = Pmil + Pcu2", () => {
    const r = motorKaymaRotorKayiplari.compute(g);
    expect((r.intermediates.hava_araligi_gucu_kW as number)).toBeCloseTo(11 + (r.intermediates.rotor_bakir_kaybi_kW as number), 10);
  });
  it("devir 1350 (s %10) sınırda; 1300 (s %13,3) uygunsuz; ns üstü devir şema hatası", () => {
    expect(motorKaymaRotorKayiplari.compute({ ...g, devir_rpm: 1350 }).verdict?.status).toBe("sinirda");
    expect(motorKaymaRotorKayiplari.compute({ ...g, devir_rpm: 1300 }).verdict?.status).toBe("uygunsuz");
    expect(motorKaymaRotorKayiplari.inputSchema.safeParse({ ...g, devir_rpm: 1500 }).success).toBe(false);
  });
});
