import { describe, it, expect } from "vitest";
import { koruyucuCihazAzamiKabloBoyu } from "./koruma-cihazi-azami-kablo-boyu";

describe("Koruma Cihazı İçin Azami Kablo Boyu", () => {
  const g = { U0_V: 230, fazKesiti_mm2: 2.5, pe_Kesiti_mm2: 2.5, anmaAkimi_A: 16, egri: "B" as const, iletkenMalzemesi: "bakir" as const, hataSicakligi_C: 70, gerceklKabloBoyu_m: 100 };
  it("2,5 mm² Cu, B16, m = 1, 70 °C: ρ = 0,020629; Lmaks = 139,37 m", () => {
    const r = koruyucuCihazAzamiKabloBoyu.compute(g);
    expect(r.intermediates.iletken_ozdirenci_ohm_mm2_m as number).toBeCloseTo(0.0206289, 6);
    expect(r.intermediates.Ia_A).toBe(80);
    expect(r.value.azamiKabloBoyu_m).toBeCloseTo(139.368, 2);
    expect(r.verdict?.status).toBe("uygun"); // 100/139,4 = 0,72
  });
  it("C eğrisi Ia'yı ikiye katlar, boy yarıya iner", () => {
    const b = koruyucuCihazAzamiKabloBoyu.compute(g).value.azamiKabloBoyu_m;
    const c = koruyucuCihazAzamiKabloBoyu.compute({ ...g, egri: "C" }).value.azamiKabloBoyu_m;
    expect(c).toBeCloseTo(b / 2, 8);
  });
  it("gerçek boy 120 m → oran 0,86 sınırda; 150 m → uygunsuz", () => {
    expect(koruyucuCihazAzamiKabloBoyu.compute({ ...g, gerceklKabloBoyu_m: 120 }).verdict?.status).toBe("sinirda");
    expect(koruyucuCihazAzamiKabloBoyu.compute({ ...g, gerceklKabloBoyu_m: 150 }).verdict?.status).toBe("uygunsuz");
  });
});
