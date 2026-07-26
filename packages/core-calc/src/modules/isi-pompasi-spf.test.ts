import { describe, expect, it } from "vitest";
import { isiPompasiSpf } from "./isi-pompasi-spf";

describe("isi-pompasi-spf", () => {
  it("Isıtma çıktısı=15000kWh, elektrik girdisi=4500kWh → SPF≈3.333", () => {
    const r = isiPompasiSpf.compute({
      toplamIsitmaCiktisi_kWh: 15000,
      toplamElektrikGirdisi_kWh: 4500,
    });

    expect(r.value.spf).toBeCloseTo(3.333, 2);
  });
});
