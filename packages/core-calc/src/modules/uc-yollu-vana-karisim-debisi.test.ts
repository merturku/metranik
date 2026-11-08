import { describe, it, expect } from "vitest";
import { ucYolluVanaKarisimDebisi } from "./uc-yollu-vana-karisim-debisi";

const g = { primerSicaklik_C: 80, donusSicakligi_C: 40, hedefKarisimSicakligi_C: 60, sekonderDebi_m3h: 10 };

describe("3 Yollu Karışım Vanası", () => {
  it("80/40 °C → 60 °C: x = 0,5, primer 5 m³/h, bypass 5 m³/h", () => {
    const r = ucYolluVanaKarisimDebisi.compute(g);
    expect(r.value.primerDebi_m3h as number).toBeCloseTo(5, 8);
    expect(r.intermediates.bypass_donus_debisi_m3h as number).toBeCloseTo(5, 8);
  });
  it("hedef 50 °C → x = 0,25; enerji dengesi x·80 + (1−x)·40 = 50", () => {
    const r = ucYolluVanaKarisimDebisi.compute({ ...g, hedefKarisimSicakligi_C: 50 });
    const x = r.intermediates.primer_payi_x as number;
    expect(x).toBeCloseTo(0.25, 8);
    expect(x * 80 + (1 - x) * 40).toBeCloseTo(50, 8);
  });
  it("hedef primerden yüksekse null + uygunsuz", () => {
    const r = ucYolluVanaKarisimDebisi.compute({ ...g, hedefKarisimSicakligi_C: 90 });
    expect(r.value.primerDebi_m3h).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
