import { describe, expect, it } from "vitest";
import { konsolKirisSehimi } from "./konsol-kiris-sehimi";

describe("konsolKirisSehimi", () => {
  it("w=5000 N/m, L=2m, E=2.1e10 Pa, I=0.0004 m⁴ → δ≈1.19 mm, uygun", () => {
    const r = konsolKirisSehimi.compute({
      yayiliYuk_w_Nm: 5000,
      aciklik_L_m: 2,
      elastisiteModulu_E_Pa: 2.1e10,
      ataletMomenti_I_m4: 0.0004,
    });
    expect(r.value.sehim_mm).toBeCloseTo(1.1905, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("sehim L/180'i aşarsa uygunsuz döner", () => {
    const r = konsolKirisSehimi.compute({
      yayiliYuk_w_Nm: 50000,
      aciklik_L_m: 2,
      elastisiteModulu_E_Pa: 2.1e10,
      ataletMomenti_I_m4: 0.0004,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
