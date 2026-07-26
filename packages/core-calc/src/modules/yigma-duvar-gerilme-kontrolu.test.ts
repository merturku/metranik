import { describe, expect, it } from "vitest";
import { yigmaDuvarGerilmeKontrolu } from "./yigma-duvar-gerilme-kontrolu";

describe("yigma-duvar-gerilme-kontrolu", () => {
  it("N=200kN, A=0.6m², izin=2MPa → σ≈0.333MPa, uygun", () => {
    const r = yigmaDuvarGerilmeKontrolu.compute({
      eksenelYuk_N_kN: 200,
      duvarKesitAlani_A_m2: 0.6,
      izinVerilenBasincGerilmesi_MPa: 2,
    });

    expect(r.value.olusanGerilme_MPa).toBeCloseTo(0.3333, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("çok küçük kesit alanında gerilme sınırı aşabilir → uygunsuz", () => {
    const r = yigmaDuvarGerilmeKontrolu.compute({
      eksenelYuk_N_kN: 200,
      duvarKesitAlani_A_m2: 0.05,
      izinVerilenBasincGerilmesi_MPa: 2,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
