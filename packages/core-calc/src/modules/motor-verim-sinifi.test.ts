import { describe, it, expect } from "vitest";
import { motorVerimSinifi } from "./motor-verim-sinifi";

describe("Motor Verim Sınıfı", () => {
  it("11 kW çıkış, 11.7 kW giriş → 94% (IE3)", () => {
    const r = motorVerimSinifi.compute({ nominal_guc_kW: 11, giris_gucu_kW: 11.7, verim_beklenen_yuzde: 94 });
    expect(r.value.verim_fiili_yuzde).toBeGreaterThan(93);
  });
});
