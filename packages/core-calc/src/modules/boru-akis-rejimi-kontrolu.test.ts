import { describe, expect, it } from "vitest";
import { boruAkisRejimiKontrolu } from "./boru-akis-rejimi-kontrolu";

describe("boruAkisRejimiKontrolu", () => {
  it("ρ=1000, v=2 m/s, D=0.05m, μ=0.001 Pa·s → Re=100000, türbülanslı", () => {
    const r = boruAkisRejimiKontrolu.compute({
      yogunluk_rho_kgm3: 1000,
      akisHizi_v_ms: 2,
      boruIcCapi_D_m: 0.05,
      dinamikViskozite_mu_Pas: 0.001,
    });
    expect(r.value.reynoldsSayisi_Re).toBeCloseTo(100000, 0);
    expect(r.value.akisRejimi).toBe("turbulansli");
  });

  it("düşük hızda laminer akışı doğru sınıflandırır", () => {
    const r = boruAkisRejimiKontrolu.compute({
      yogunluk_rho_kgm3: 1000,
      akisHizi_v_ms: 0.02,
      boruIcCapi_D_m: 0.05,
      dinamikViskozite_mu_Pas: 0.001,
    });
    expect(r.value.reynoldsSayisi_Re).toBeCloseTo(1000, 0);
    expect(r.value.akisRejimi).toBe("laminer");
  });
});
