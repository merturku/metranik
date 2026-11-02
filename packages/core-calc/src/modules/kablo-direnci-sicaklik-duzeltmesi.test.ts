import { describe, it, expect } from "vitest";
import { kabloDirenciSicaklikDuzeltmesi } from "./kablo-direnci-sicaklik-duzeltmesi";

describe("Kablo Direnci Sıcaklık Düzeltmesi", () => {
  it("16 mm² Cu, 100 m: R20 = 0,10776 Ω; 70 °C'de ×1,1965 = 0,12893 Ω", () => {
    const r = kabloDirenciSicaklikDuzeltmesi.compute({ kesit_mm2: 16, uzunluk_m: 100, malzeme: "bakir", iletkenSicakligi_C: 70 });
    expect(r.intermediates.R20_ohm as number).toBeCloseTo(0.10776, 5);
    expect(r.value.direnc_ohm).toBeCloseTo(0.12893, 4);
  });
  it("IEC 60228: 1 mm² Cu 20 °C'de 17,241 Ω/km; 20 °C'de çarpan 1", () => {
    const r = kabloDirenciSicaklikDuzeltmesi.compute({ kesit_mm2: 1, uzunluk_m: 1000, malzeme: "bakir", iletkenSicakligi_C: 20 });
    expect(r.value.direnc_ohm).toBeCloseTo(17.241, 3);
    expect(r.intermediates.sicaklik_carpani).toBe(1);
  });
  it("Al, Cu'dan yüksek dirençli (aynı kesit)", () => {
    const o = { kesit_mm2: 16, uzunluk_m: 100, iletkenSicakligi_C: 20 };
    expect(kabloDirenciSicaklikDuzeltmesi.compute({ ...o, malzeme: "aluminyum" }).value.direnc_ohm).toBeGreaterThan(
      kabloDirenciSicaklikDuzeltmesi.compute({ ...o, malzeme: "bakir" }).value.direnc_ohm,
    );
  });
});
