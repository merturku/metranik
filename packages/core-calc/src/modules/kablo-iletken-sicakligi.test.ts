import { describe, it, expect } from "vitest";
import { kabloIletkenSicakligi } from "./kablo-iletken-sicakligi";

describe("Kablo İletken Sıcaklığı", () => {
  const o = { isletmeAkimi_A: 50, akimTasimaKapasitesi_A: 100, ortamSicakligi_C: 30, izinVerilenSicaklik_C: 70 };
  it("I/Iz = 0,5, 30 °C, 70 °C sınırı → 30 + 40·0,25 = 40 °C", () => {
    const r = kabloIletkenSicakligi.compute(o);
    expect(r.value.iletkenSicakligi_C).toBeCloseTo(40, 9);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("I = Iz → sınır sıcaklık (70 °C); I > Iz uygunsuz", () => {
    expect(kabloIletkenSicakligi.compute({ ...o, isletmeAkimi_A: 100 }).value.iletkenSicakligi_C).toBeCloseTo(70, 9);
    expect(kabloIletkenSicakligi.compute({ ...o, isletmeAkimi_A: 120 }).verdict?.status).toBe("uygunsuz");
  });
});
