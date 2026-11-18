import { describe, it, expect } from "vitest";
import { trafoSicakNoktaYaslanmaHizi } from "./trafo-sicak-nokta-yaslanma-hizi";

describe("Trafo Sıcak Nokta Yaşlanma Hızı", () => {
  const g = { ortamSicakligi_C: 30, ustYagArtisi_K: 55, sicakNoktaGradyani_K: 13, kagitTuru: "normal" as const };
  it("normal kâğıt: 98 °C → V = 1; +6 K → 2; −6 K → 0,5", () => {
    expect(trafoSicakNoktaYaslanmaHizi.compute(g).value.yaslanmaHizi).toBeCloseTo(1, 12);
    expect(trafoSicakNoktaYaslanmaHizi.compute({ ...g, ortamSicakligi_C: 36 }).value.yaslanmaHizi).toBeCloseTo(2, 12);
    expect(trafoSicakNoktaYaslanmaHizi.compute({ ...g, ortamSicakligi_C: 24 }).value.yaslanmaHizi).toBeCloseTo(0.5, 12);
  });
  it("V = 1'de referans ömür 180 000 h = 20,55 yıl; günlük eşdeğer yaşlanma 24 h", () => {
    const r = trafoSicakNoktaYaslanmaHizi.compute(g);
    expect(r.intermediates.referans_omur_yil as number).toBeCloseTo(20.5479, 3);
    expect(r.intermediates.gunluk_esdeger_yaslanma_h as number).toBeCloseTo(24, 10);
  });
  it("termal iyileştirilmiş kâğıt: 110 °C → V = 1; 98 °C → 0,2817", () => {
    const t = { ...g, kagitTuru: "termal" as const };
    expect(trafoSicakNoktaYaslanmaHizi.compute({ ...t, ortamSicakligi_C: 42 }).value.yaslanmaHizi).toBeCloseTo(1, 12);
    expect(trafoSicakNoktaYaslanmaHizi.compute(t).value.yaslanmaHizi).toBeCloseTo(0.28174, 4);
  });
  it("verdict eşikleri: 98 uygun, 110 sınırda, 125 uygunsuz", () => {
    expect(trafoSicakNoktaYaslanmaHizi.compute(g).verdict?.status).toBe("uygun");
    expect(trafoSicakNoktaYaslanmaHizi.compute({ ...g, ortamSicakligi_C: 42 }).verdict?.status).toBe("sinirda");
    expect(trafoSicakNoktaYaslanmaHizi.compute({ ...g, ortamSicakligi_C: 57 }).verdict?.status).toBe("uygunsuz");
  });
});
