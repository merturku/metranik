import { describe, expect, it } from "vitest";
import { kazikGrubuVerimliligi } from "./kazik-grubu-verimliligi";

describe("kazik-grubu-verimliligi", () => {
  it("d=0.4m, s=1.2m, 3x3 grup → θ≈18.43°, verimlilik≈0.727", () => {
    const r = kazikGrubuVerimliligi.compute({
      kazikCapi_d_m: 0.4,
      kazikArasiMesafe_s_m: 1.2,
      siraSayisi_m: 3,
      sutunSayisi_n: 3,
    });

    expect(r.intermediates.theta_derece).toBeCloseTo(18.43, 1);
    expect(r.value.grupVerimliligi).toBeCloseTo(0.7269, 3);
  });
});
