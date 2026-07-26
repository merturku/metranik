import { describe, expect, it } from "vitest";
import { pompaNpshKontrolu } from "./pompa-npsh-kontrolu";

describe("pompaNpshKontrolu", () => {
  it("Patm=101325 Pa, Pv=2340 Pa, ρ=998, hs=2m, hf=1m → NPSHa≈7.11 m", () => {
    const r = pompaNpshKontrolu.compute({
      atmosferBasinci_Patm_Pa: 101325,
      buharBasinci_Pv_Pa: 2340,
      yogunluk_rho_kgm3: 998,
      emmeYuksekligi_hs_m: 2,
      emmeHattiKaybi_hf_m: 1,
      gerekliNpsh_NPSHr_m: 3,
    });
    expect(r.value.npsha_m).toBeCloseTo(7.1104, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("NPSHa, NPSHr'nin altındaysa uygunsuz döner", () => {
    const r = pompaNpshKontrolu.compute({
      atmosferBasinci_Patm_Pa: 101325,
      buharBasinci_Pv_Pa: 2340,
      yogunluk_rho_kgm3: 998,
      emmeYuksekligi_hs_m: 6,
      emmeHattiKaybi_hf_m: 3,
      gerekliNpsh_NPSHr_m: 3,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
