import { describe, expect, it } from "vitest";
import { kompresorSikistirmaSicakligi } from "./kompresor-sikistirma-sicakligi";

describe("kompresor-sikistirma-sicakligi", () => {
  it("T1=20°C, P1=1bar, P2=8bar → ~257.9°C", () => {
    const r = kompresorSikistirmaSicakligi.compute({
      girisSicakligi_T1_C: 20,
      girisBasinci_P1_bar: 1,
      cikisBasinci_P2_bar: 8,
    });

    expect(r.intermediates.basincOrani).toBeCloseTo(8, 5);
    expect(r.value.cikisSicakligi_C).toBeCloseTo(257.876, 1);
  });
});
