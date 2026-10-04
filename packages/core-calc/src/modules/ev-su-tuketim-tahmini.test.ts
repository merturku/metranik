import { describe, it, expect } from "vitest";
import { evSuTuketimTahmini } from "./ev-su-tuketim-tahmini";

describe("Su Tüketim", () => {
  it("4 kişi, 150 L/kişi/gün → 0.6 m³/gün", () => {
    const r = evSuTuketimTahmini.compute({ kisi_sayisi: 4, gunluk_tüketim_kisibasina_L: 150 });
    expect(r.value.gunluk_m3).toBeCloseTo(0.6, 1);
  });
});
