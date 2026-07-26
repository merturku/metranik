import { describe, expect, it } from "vitest";
import { kabloKisaDevreTermikKontrolu } from "./kablo-kisa-devre-termik-kontrolu";

describe("kabloKisaDevreTermikKontrolu", () => {
  it("I=10kA, t=0.5s, k=115 → Smin≈61.49 mm², 70mm² kesitle uygun", () => {
    const r = kabloKisaDevreTermikKontrolu.compute({
      kisaDevreAkimi_I_kA: 10,
      kesmeSuresi_t_s: 0.5,
      malzemeSabiti_k: 115,
      mevcutKesit_S_mm2: 70,
    });
    expect(r.value.gerekliMinKesit_mm2).toBeCloseTo(61.4875, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("50 mm² kesit yetersizse uygunsuz döner", () => {
    const r = kabloKisaDevreTermikKontrolu.compute({
      kisaDevreAkimi_I_kA: 10,
      kesmeSuresi_t_s: 0.5,
      malzemeSabiti_k: 115,
      mevcutKesit_S_mm2: 50,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
