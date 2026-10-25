import { describe, it, expect } from "vitest";
import { sogukOdaUrunYuku, sogukOdaUrunYukuInputSchema } from "./soguk-oda-urun-yuku";

// Balık: c1 = 3,6, c2 = 1,9 kJ/kgK, hif = 255 kJ/kg, Tf = −2,2 °C.
const balik = {
  urunKutlesi_kg: 1000,
  girisSicakligi_C: 10,
  depolamaSicakligi_C: -18,
  donmaNoktasi_C: -2.2,
  donmaUstuOzgulIsi_kJkgK: 3.6,
  donmaAltiOzgulIsi_kJkgK: 1.9,
  donmaGizliIsisi_kJkg: 255,
  sogutmaSuresi_h: 24,
};

describe("Soğuk Oda Ürün Soğutma Yükü", () => {
  it("1000 kg balık 10 → −18 °C, 24 h: Q1 = 1000×3,6×12,2 = 43 920; Q2 = 255 000; Q3 = 1000×1,9×15,8 = 30 020 kJ → 328 940 kJ / 86 400 s = 3,807 kW", () => {
    const r = sogukOdaUrunYuku.compute(balik);
    expect(r.intermediates.donma_ustu_duyulur_isi_kJ).toBeCloseTo(43920, 6);
    expect(r.intermediates.donma_gizli_isisi_kJ).toBe(255000);
    expect(r.intermediates.donma_alti_duyulur_isi_kJ).toBeCloseTo(30020, 6);
    expect(r.value.urunSogutmaYuku_kW).toBeCloseTo(3.80718, 5);
  });

  it("Donmadan soğutma (dana eti 30 → 2 °C, c1 = 3,5): Q = 1000×3,5×28 = 98 000 kJ → 1,134 kW; gizli ısı yok", () => {
    const r = sogukOdaUrunYuku.compute({
      ...balik,
      girisSicakligi_C: 30,
      depolamaSicakligi_C: 2,
      donmaNoktasi_C: -1.7,
      donmaUstuOzgulIsi_kJkgK: 3.5,
    });
    expect(r.intermediates.toplam_isi_kJ).toBeCloseTo(98000, 6);
    expect(r.intermediates.donma_gizli_isisi_kJ).toBe(0);
    expect(r.value.urunSogutmaYuku_kW).toBeCloseTo(1.13426, 5);
  });

  it("Süre yarıya inince yük iki katına çıkar", () => {
    const r = sogukOdaUrunYuku.compute({ ...balik, sogutmaSuresi_h: 12 });
    expect(r.value.urunSogutmaYuku_kW).toBeCloseTo(2 * 3.80718, 4);
  });

  it("Depolama sıcaklığı giriş sıcaklığından yüksek olamaz", () => {
    expect(sogukOdaUrunYukuInputSchema.safeParse({ ...balik, depolamaSicakligi_C: 15 }).success).toBe(false);
  });
});
