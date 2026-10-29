import { describe, it, expect } from "vitest";
import {
  evaporatifSogutmaCikisSicakligi,
  evaporatifSogutmaCikisSicakligiInputSchema,
} from "./evaporatif-sogutma-cikis-sicakligi";

// Ders kitabı tipi örnek: 35 °C kuru / 22 °C yaş, ε = 0,85 → t2 = 35 − 0,85·13 = 23,95 °C.
const ornek = { girisKuruTermometre_C: 35, girisYasTermometre_C: 22, doygunlukVerimi: 0.85, havaDebisi_m3h: 10000 };

describe("Evaporatif Soğutma Çıkış Sıcaklığı", () => {
  it("t2 = t1 − ε(t1 − t*1) = 23,95 °C", () => {
    const r = evaporatifSogutmaCikisSicakligi.compute(ornek);
    expect(r.value.cikisSicakligi_C).toBeCloseTo(23.95, 6);
    expect(r.intermediates.sicaklik_dususu_K).toBeCloseTo(11.05, 6);
  });

  it("duyulur etki: 1,2·(10000/3600)·1,006·11,05 = 37,05 kW", () => {
    const r = evaporatifSogutmaCikisSicakligi.compute(ornek);
    expect(r.intermediates.duyulur_sogutma_etkisi_kW).toBeCloseTo(37.054, 2);
  });

  it("ε = 1 → çıkış yaş termometreye eşittir (fiziksel alt sınır)", () => {
    const r = evaporatifSogutmaCikisSicakligi.compute({ ...ornek, doygunlukVerimi: 1 });
    expect(r.value.cikisSicakligi_C).toBeCloseTo(22, 9);
  });

  it("yaş termometre kuru termometreden büyükse şema reddeder", () => {
    expect(evaporatifSogutmaCikisSicakligiInputSchema.safeParse({ ...ornek, girisYasTermometre_C: 40 }).success).toBe(false);
  });
});
