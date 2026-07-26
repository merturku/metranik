import { describe, expect, it } from "vitest";
import { isiPompasiKompresorGucu } from "./isi-pompasi-kompresor-gucu";

describe("isi-pompasi-kompresor-gucu", () => {
  it("Isıtma yükü=20kW, COP=3.5 → ~5.714 kW", () => {
    const r = isiPompasiKompresorGucu.compute({
      isitmaYuku_kW: 20,
      performansKatsayisi_COP: 3.5,
    });

    expect(r.value.gerekliKompresorGucu_kW).toBeCloseTo(5.714, 2);
  });
});
