import { describe, expect, it } from "vitest";
import { yuzeyYogusmaRiskiKontrolu } from "./yuzey-yogusma-riski-kontrolu";

describe("yuzey-yogusma-riski-kontrolu", () => {
  it("Tyuzey=18°C, Tçiy=14°C, marj=1°C → fark 4°C ≥ marj → uygun", () => {
    const r = yuzeyYogusmaRiskiKontrolu.compute({
      yuzeySicakligi_Tyuzey_C: 18,
      ciyNoktasiSicakligi_Tciy_C: 14,
      guvenlikMarji_C: 1,
    });

    expect(r.value.sicaklikFarki_C).toBeCloseTo(4, 5);
    expect(r.verdict?.status).toBe("uygun");
  });
});
