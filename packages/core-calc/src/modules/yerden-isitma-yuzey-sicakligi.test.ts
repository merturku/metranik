import { describe, it, expect } from "vitest";
import { yerdenIsitmaYuzeySicakligi, yerdenIsitmaYuzeySicakligiInputSchema } from "./yerden-isitma-yuzey-sicakligi";

const oda = {
  isiKaybi_W: 1400,
  aktifDosemeAlani_m2: 20,
  odaSicakligi_C: 20,
  bolge: "oturma" as const,
};

describe("Yerden Isıtma Yüzey Sıcaklığı Kontrolü", () => {
  it("EN 1264 sınır eğrisi: θi = 20 °C, oturma bölgesi 29 °C → qG = 8,92×9^1,1 ≈ 100 W/m²; kenar bölgesi 35 °C → ≈ 175 W/m²", () => {
    const oturma = yerdenIsitmaYuzeySicakligi.compute(oda);
    expect(oturma.intermediates.sinir_isi_akisi_qG_Wm2).toBeCloseTo(100.0, 1);
    const kenar = yerdenIsitmaYuzeySicakligi.compute({ ...oda, bolge: "kenar" });
    expect(kenar.intermediates.sinir_isi_akisi_qG_Wm2).toBeCloseTo(175.41, 2);
  });

  it("1400 W / 20 m² = 70 W/m²: θF,m = 20 + (70/8,92)^(1/1,1) = 26,51 °C → uygun", () => {
    const r = yerdenIsitmaYuzeySicakligi.compute(oda);
    expect(r.intermediates.isi_akisi_q_Wm2).toBe(70);
    expect(r.value.ortalamaYuzeySicakligi_C).toBeCloseTo(26.507, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("120 W/m²: θF,m = 30,62 °C → oturma bölgesinde uygunsuz, kenar bölgesinde uygun", () => {
    const yuksek = { ...oda, isiKaybi_W: 2400 };
    const r = yerdenIsitmaYuzeySicakligi.compute(yuksek);
    expect(r.value.ortalamaYuzeySicakligi_C).toBeCloseTo(30.622, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(yerdenIsitmaYuzeySicakligi.compute({ ...yuksek, bolge: "kenar" }).verdict?.status).toBe("uygun");
  });

  it("Banyo θi = 24 °C: sınır θi + 9 K = 33 °C, qG yine ≈ 100 W/m²", () => {
    const r = yerdenIsitmaYuzeySicakligi.compute({ ...oda, odaSicakligi_C: 24, bolge: "banyo" });
    expect(r.intermediates.sinir_yuzey_sicakligi_C).toBe(33);
    expect(r.intermediates.sinir_isi_akisi_qG_Wm2).toBeCloseTo(100.0, 1);
  });

  it("Alan sıfır olamaz", () => {
    expect(yerdenIsitmaYuzeySicakligiInputSchema.safeParse({ ...oda, aktifDosemeAlani_m2: 0 }).success).toBe(false);
  });
});
