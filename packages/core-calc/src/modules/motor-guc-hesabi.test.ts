import { describe, it, expect } from "vitest";
import { motorGucHesabi } from "./motor-guc-hesabi";
describe("Motor", () => {
  it("11 kW, 90%", () => {
    const r = motorGucHesabi.compute({ P_cikis_kW: 11, eta: 90 });
    expect(r.value.P_giris_kW).toBeGreaterThan(11);
  });
});
