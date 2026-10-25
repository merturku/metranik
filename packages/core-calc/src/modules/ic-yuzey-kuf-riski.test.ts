import { describe, it, expect } from "vitest";
import { icYuzeyKufRiski, icYuzeyKufRiskiInputSchema } from "./ic-yuzey-kuf-riski";

const duvar = { isilGecirgenlik_U_Wm2K: 1.0, icSicaklik_C: 20, icBagilNem_yuzde: 60, disSicaklik_C: 0, elemanTipi: "opak" as const };

describe("Duvar/Pencere İç Yüzey Sıcaklığı ve Küf Riski", () => {
  it("EN ISO 13788 Ek E: psat(20 °C) = 2337 Pa; %60 nemde pi = 1402 Pa → çiy noktası 12,00 °C, küf sınırı (pi/0,8) 15,43 °C, fRsi,min = 0,772", () => {
    const r = icYuzeyKufRiski.compute(duvar);
    expect(r.intermediates.ic_buhar_basinci_Pa).toBeCloseTo(1402.17, 2);
    expect(r.intermediates.ciy_noktasi_C).toBeCloseTo(12.0039, 3);
    expect(r.intermediates.kuf_siniri_yuzey_sicakligi_C).toBeCloseTo(15.4349, 3);
    expect(r.intermediates.gerekli_fRsi_kuf).toBeCloseTo(0.77174, 4);
  });

  it("U = 1,0 opak duvar: fRsi = 1 − 0,25 = 0,75 → θsi = 15,0 °C: yoğuşma yok, küf sınırının altında → sınırda", () => {
    const r = icYuzeyKufRiski.compute(duvar);
    expect(r.value.icYuzeySicakligi_C).toBeCloseTo(15, 9);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("Yalıtımlı duvar U = 0,4 → θsi = 18 °C uygun; yalıtımsız U = 2,0 → 10 °C < 12 °C yoğuşma, uygunsuz", () => {
    expect(icYuzeyKufRiski.compute({ ...duvar, isilGecirgenlik_U_Wm2K: 0.4 }).verdict?.status).toBe("uygun");
    const r = icYuzeyKufRiski.compute({ ...duvar, isilGecirgenlik_U_Wm2K: 2 });
    expect(r.value.icYuzeySicakligi_C).toBeCloseTo(10, 9);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Cam U = 2,8 (Rsi = 0,13): fRsi = 0,636 → θsi = 12,72 °C > çiy noktası → uygun (camda küf değil yoğuşma ölçütü)", () => {
    const r = icYuzeyKufRiski.compute({ ...duvar, isilGecirgenlik_U_Wm2K: 2.8, elemanTipi: "cam" });
    expect(r.intermediates.sicaklik_faktoru_fRsi).toBeCloseTo(0.636, 9);
    expect(r.value.icYuzeySicakligi_C).toBeCloseTo(12.72, 9);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Dış sıcaklık sıfırın altında (−5 °C, %50 nem): buz üstü formülü değil, iç taraf su formülü kullanılır; küf sınırı 12,62 °C", () => {
    const r = icYuzeyKufRiski.compute({ ...duvar, disSicaklik_C: -5, icBagilNem_yuzde: 50 });
    expect(r.intermediates.kuf_siniri_yuzey_sicakligi_C).toBeCloseTo(12.6246, 3);
    expect(r.intermediates.gerekli_fRsi_kuf).toBeCloseTo(0.70498, 4);
    expect(icYuzeyKufRiskiInputSchema.safeParse({ ...duvar, disSicaklik_C: 25 }).success).toBe(false);
  });
});
