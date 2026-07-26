import { describe, expect, it } from "vitest";
import { kirisSehimKontrolu } from "./kiris-sehim-kontrolu";

describe("kirisSehimKontrolu", () => {
  it("w=10000 N/m, L=6m, E=2.1e10 Pa, I=0.0008 m⁴ → δ≈10.04 mm, uygun", () => {
    const r = kirisSehimKontrolu.compute({
      yayiliYuk_w_Nm: 10000,
      aciklik_L_m: 6,
      elastisiteModulu_E_Pa: 2.1e10,
      ataletMomenti_I_m4: 0.0008,
    });
    expect(r.value.sehim_mm).toBeCloseTo(10.0446, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("sehim L/250'yi aşarsa uygunsuz döner", () => {
    const r = kirisSehimKontrolu.compute({
      yayiliYuk_w_Nm: 50000,
      aciklik_L_m: 6,
      elastisiteModulu_E_Pa: 2.1e10,
      ataletMomenti_I_m4: 0.0008,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
