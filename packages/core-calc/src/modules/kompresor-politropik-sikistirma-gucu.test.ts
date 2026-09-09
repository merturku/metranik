import { describe, expect, it } from "vitest";
import { kompresorPolitropikSikistirmaGucu } from "./kompresor-politropik-sikistirma-gucu";

describe("kompresor-politropik-sikistirma-gucu", () => {
  it("n=1.3, R=287 J/kgK (hava), T1=293K, basınç oranı=6, ṁ=0.5 kg/s → ~93.3 kW", () => {
    const r = kompresorPolitropikSikistirmaGucu.compute({
      politropikIndeks_n: 1.3,
      ozgulGazSabiti_R_JkgK: 287,
      girisSicakligi_T1_K: 293,
      basincOrani_P2P1: 6,
      kutleselDebi_mdot_kgs: 0.5,
    });

    expect(r.intermediates.birimKutleIsi_Jkg).toBeCloseTo(186597.3, 0);
    expect(r.value.guc_kW).toBeCloseTo(93.3, 1);
  });
});
