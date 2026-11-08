import { describe, it, expect } from "vitest";
import { boruDonmaSuresi } from "./boru-donma-suresi";

const g = { icCap_mm: 25, boyIsiKaybiKatsayisi_WmK: 0.5, baslangicSicakligi_C: 15, disSicaklik_C: -10, donmaSicakligi_C: 0 };

describe("Boru İçi Su Donma Süresi", () => {
  it("d = 25 mm, U' = 0,5 W/mK: C' = 2048 J/mK, τ = 1,138 h; 15 → 0 °C, Te = −10: t = τ·ln(2,5) = 1,042 h", () => {
    const r = boruDonmaSuresi.compute(g);
    expect(r.intermediates.boy_basina_isil_kapasite_JmK as number).toBeCloseTo(2047.9, 0);
    expect(r.intermediates.zaman_sabiti_saat as number).toBeCloseTo(1.1377, 3);
    expect(r.value.sure_saat as number).toBeCloseTo(1.0425, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("dış sıcaklık 0 °C üstündeyse null + uygun; yalıtım iyileşince (U' ↓) süre uzar", () => {
    expect(boruDonmaSuresi.compute({ ...g, disSicaklik_C: 2 }).value.sure_saat).toBeNull();
    const iyi = boruDonmaSuresi.compute({ ...g, boyIsiKaybiKatsayisi_WmK: 0.05 });
    expect(iyi.value.sure_saat as number).toBeCloseTo(10.425, 2);
    expect(iyi.verdict?.status).toBe("sinirda");
  });
});
