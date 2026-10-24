import { describe, it, expect } from "vitest";
import { boruIsiKaybiYuzeySicakligi } from "./boru-isi-kaybi-yuzey-sicakligi";

describe("Yalıtımlı Boru Yüzey Sıcaklığı (düzlemsel yaklaşım)", () => {
  it("80 °C iç, 20 °C ortam, 50 mm (k=0,04, h=10): R = 1,25 + 0,10 → Tyüzey = 80 − 60×1,25/1,35 = 24,4 °C → uygun", () => {
    const r = boruIsiKaybiYuzeySicakligi.compute({
      ic_sicaklik_C: 80,
      ortam_sicakligi_C: 20,
      isolasyon_kalınligi_mm: 50,
      max_yuzey_sicakligi_C: 60,
    });
    expect(r.value.yuzey_sicakligi_C).toBeCloseTo(24.44, 2);
    expect(r.intermediates.isi_akisi_Wm2).toBeCloseTo(44.44, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("150 °C iç, 20 °C ortam, 5 mm: Tyüzey = 150 − 130×0,125/0,225 = 77,8 °C > 60 °C → uygunsuz", () => {
    const r = boruIsiKaybiYuzeySicakligi.compute({
      ic_sicaklik_C: 150,
      ortam_sicakligi_C: 20,
      isolasyon_kalınligi_mm: 5,
      max_yuzey_sicakligi_C: 60,
    });
    expect(r.value.yuzey_sicakligi_C).toBeCloseTo(77.78, 2);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
