import { describe, expect, it } from "vitest";
import { sogutmaKulesiKapasitesi } from "./sogutma-kulesi-kapasitesi";

describe("sogutma-kulesi-kapasitesi", () => {
  it("100 m³/h, giriş 35°C, çıkış 29°C, yaş termometre 24°C → ~697.7 kW, Range 6°C, Approach 5°C", () => {
    const r = sogutmaKulesiKapasitesi.compute({
      suDebisi_m3h: 100,
      girisSuSicakligi_C: 35,
      cikisSuSicakligi_C: 29,
      yasTermometreSicakligi_C: 24,
    });

    expect(r.intermediates.range_C).toBeCloseTo(6, 5);
    expect(r.intermediates.approach_C).toBeCloseTo(5, 5);
    expect(r.value.atilanIsi_kW).toBeCloseTo(697.67, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
});
