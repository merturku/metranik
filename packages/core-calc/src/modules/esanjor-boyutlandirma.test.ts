import { describe, expect, it } from "vitest";
import { esanjorBoyutlandirma } from "./esanjor-boyutlandirma";

describe("esanjor-boyutlandirma", () => {
  it("Q=100kW, U=1500 W/m²K, LMTD=10°C → ~6.667 m²", () => {
    const r = esanjorBoyutlandirma.compute({
      isilYuk_Q_kW: 100,
      isiTransferKatsayisi_U_Wm2K: 1500,
      logaritmikOrtalamaSicaklikFarki_LMTD_C: 10,
    });

    expect(r.intermediates.isilYuk_W).toBeCloseTo(100000, 5);
    expect(r.value.gerekliYuzeyAlani_m2).toBeCloseTo(6.667, 2);
  });
});
