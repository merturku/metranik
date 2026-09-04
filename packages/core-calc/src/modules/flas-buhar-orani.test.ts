import { describe, expect, it } from "vitest";
import { flasBuharOrani } from "./flas-buhar-orani";

describe("flas-buhar-orani", () => {
  it("10 bar→atm blöf: hf=762.6/419.1 kJ/kg, hfg=2256.9 kJ/kg, 500 kg/h blöf → x≈0.1522, ~76.1 kg/h flaş buhar", () => {
    const r = flasBuharOrani.compute({
      blofDebisi_kgh: 500,
      yuksekBasincDoymusSuEntalpisi_hfYuksek_kJkg: 762.6,
      dusukBasincDoymusSuEntalpisi_hfDusuk_kJkg: 419.1,
      dusukBasincBuharlasmaGizliIsisi_hfgDusuk_kJkg: 2256.9,
    });

    expect(r.intermediates.flasBuharOrani_x).toBeCloseTo(0.1522, 3);
    expect(r.value.flasBuharDebisi_kgh).toBeCloseTo(76.1, 1);
  });
});
