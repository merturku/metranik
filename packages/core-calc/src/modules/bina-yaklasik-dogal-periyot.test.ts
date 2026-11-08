import { describe, it, expect } from "vitest";
import { binaYaklasikDogalPeriyot } from "./bina-yaklasik-dogal-periyot";

describe("Bina Yaklaşık Doğal Periyodu", () => {
  it("Ct = 0,07, H = 30 m: 30^0,75 = 12,819, T = 0,8973 s; frekans 1,114 Hz", () => {
    const r = binaYaklasikDogalPeriyot.compute({ katsayiCt: 0.07, binaYuksekligi_m: 30, katSayisi: 10 });
    expect(r.intermediates.HN_uzeri_0_75 as number).toBeCloseTo(12.819, 2);
    expect(r.value.periyot_s).toBeCloseTo(0.8973, 3);
    expect(r.intermediates.dogal_frekans_Hz as number).toBeCloseTo(1.1144, 3);
    expect(r.intermediates.kaba_kural_T_0_1N_s as number).toBeCloseTo(1, 10);
  });
  it("H = 16 m: 16^0,75 = 8 → T = Ct·8", () => {
    const r = binaYaklasikDogalPeriyot.compute({ katsayiCt: 0.07, binaYuksekligi_m: 16, katSayisi: 5 });
    expect(r.value.periyot_s).toBeCloseTo(0.56, 10);
  });
});
