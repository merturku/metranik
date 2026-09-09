import { describe, expect, it } from "vitest";
import { boruErozyonHiziKontrolu } from "./boru-erozyon-hizi-kontrolu";

describe("boru-erozyon-hizi-kontrolu", () => {
  it("ρ=1000 kg/m³, C=122, gerçek hız=2.5 m/s → Vmax≈3.858 m/s → uygun", () => {
    const r = boruErozyonHiziKontrolu.compute({
      akiskanYogunlugu_rho_kgm3: 1000,
      erozyonKatsayisi_C: 122,
      gercekAkisHizi_V_ms: 2.5,
    });

    expect(r.value.maksimumHiz_Vmax_ms).toBeCloseTo(3.858, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
});
