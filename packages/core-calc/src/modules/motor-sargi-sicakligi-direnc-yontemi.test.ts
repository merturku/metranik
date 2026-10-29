import { describe, it, expect } from "vitest";
import { motorSargiSicakligiDirencYontemi } from "./motor-sargi-sicakligi-direnc-yontemi";

// Bakır: R1 = 10 Ω @ 20 °C, R2 = 12,5 Ω → θ2 = 1,25·254,5 − 234,5 = 83,625 °C.
const ornek = {
  soguk_direnc_ohm: 10,
  soguk_sicaklik_C: 20,
  sicak_direnc_ohm: 12.5,
  ortam_sicakligi_C: 25,
  iletkenMalzeme: "bakir" as const,
  yalitimSinifi: "B" as const,
};

describe("Motor Sargı Sıcaklığı (Direnç Yöntemi)", () => {
  it("θ2 = 83,625 °C ve artış 58,625 K → sınıf B uygun", () => {
    const r = motorSargiSicakligiDirencYontemi.compute(ornek);
    expect(r.value.sargiSicakligi_C).toBeCloseTo(83.625, 6);
    expect(r.intermediates.sicaklik_artisi_K).toBeCloseTo(58.625, 6);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("R2 = 14 Ω → θ2 = 121,8 °C, artış 96,8 K: B uygunsuz, F uygun", () => {
    const b = motorSargiSicakligiDirencYontemi.compute({ ...ornek, sicak_direnc_ohm: 14 });
    expect(b.value.sargiSicakligi_C).toBeCloseTo(121.8, 6);
    expect(b.verdict?.status).toBe("uygunsuz");
    const f = motorSargiSicakligiDirencYontemi.compute({ ...ornek, sicak_direnc_ohm: 14, yalitimSinifi: "F" });
    expect(f.verdict?.status).toBe("uygun");
  });

  it("R2 = R1 → sargı soğuk ölçüm sıcaklığındadır", () => {
    const r = motorSargiSicakligiDirencYontemi.compute({ ...ornek, sicak_direnc_ohm: 10 });
    expect(r.value.sargiSicakligi_C).toBeCloseTo(20, 9);
  });

  it("alüminyum k = 225: 1,25·245 − 225 = 81,25 °C", () => {
    const r = motorSargiSicakligiDirencYontemi.compute({ ...ornek, iletkenMalzeme: "aluminyum" });
    expect(r.value.sargiSicakligi_C).toBeCloseTo(81.25, 6);
  });
});
