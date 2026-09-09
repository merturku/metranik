import { describe, expect, it } from "vitest";
import { isiPompasiCarnotCopSiniri } from "./isi-pompasi-carnot-cop-siniri";

describe("isi-pompasi-carnot-cop-siniri", () => {
  it("Tsıcak=45°C, Tsoğuk=5°C, gerçek COP=4.0 → Carnot COP≈7.954 → uygun", () => {
    const r = isiPompasiCarnotCopSiniri.compute({
      sicakKaynakSicakligi_Tsicak_C: 45,
      sogukKaynakSicakligi_Tsoguk_C: 5,
      gercekCOP: 4.0,
    });

    expect(r.value.carnotCOP).toBeCloseTo(7.9538, 3);
    expect(r.intermediates.verimlilikOrani_gercekCarnot).toBeCloseTo(0.5029, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
});
