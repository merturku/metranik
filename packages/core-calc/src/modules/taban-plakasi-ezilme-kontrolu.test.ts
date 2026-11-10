import { describe, it, expect } from "vitest";
import { tabanPlakasiEzilmeKontrolu } from "./taban-plakasi-ezilme-kontrolu";

const g = { tasarimYuku_kN: 2000, plakaAlani_mm2: 90000, betonAlani_mm2: 360000, betonDayanimi_MPa: 25 };

describe("Taban Plakası Ezilme", () => {
  it("300×300 plaka, 600×600 beton, f'c 25: √(A2/A1)=2, Pp = 3825 kN, φPp = 2486 kN, oran 0,804 → uygun", () => {
    const r = tabanPlakasiEzilmeKontrolu.compute(g);
    expect(r.intermediates.sinirsiz_dayanim_Pp_kN as number).toBeCloseTo(3825, 6);
    expect(r.value.tasarimDayanimi_kN).toBeCloseTo(2486.25, 4);
    expect(r.intermediates.kullanim_orani as number).toBeCloseTo(0.8044, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("A2/A1 > 4 olsa da √ oranı 2 ile sınırlı (1,7 f'c A1 üst sınırı)", () => {
    const r = tabanPlakasiEzilmeKontrolu.compute({ ...g, betonAlani_mm2: 810000 });
    expect(r.intermediates.alan_orani_sqrt).toBe(2);
  });
  it("A2 = A1 → oran 1; yük aşarsa uygunsuz", () => {
    const r = tabanPlakasiEzilmeKontrolu.compute({ ...g, betonAlani_mm2: 90000, tasarimYuku_kN: 1500 });
    expect(r.intermediates.alan_orani_sqrt).toBe(1);
    expect(r.value.tasarimDayanimi_kN).toBeCloseTo(0.65 * 0.85 * 25 * 90, 6);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
