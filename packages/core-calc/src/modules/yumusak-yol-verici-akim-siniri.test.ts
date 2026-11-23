import { describe, it, expect } from "vitest";
import { yumusakYolVericiAkimSiniri } from "./yumusak-yol-verici-akim-siniri";

const g = { anmaAkimi_A: 100, direktKalkisAkimOrani: 7, direktKalkisMomentOrani: 2, baslangicGerilimi_yuzde: 50, yukMomentOrani: 0.3 };

describe("Yumuşak Yol Verici", () => {
  it("%50 gerilim: I = 700·0,5 = 350 A, T = 2·0,25 = 0,5 Tn, marj 0,5/0,3 = 1,67 → uygun", () => {
    const r = yumusakYolVericiAkimSiniri.compute(g);
    expect(r.value.kalkisAkimi_A).toBeCloseTo(350, 8);
    expect(r.intermediates.kalkis_momenti_Tn as number).toBeCloseTo(0.5, 10);
    expect(r.intermediates.moment_marji_Tkalkis_Tyuk as number).toBeCloseTo(5 / 3, 10);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("yük 0,4 Tn → umin = √(1,25·0,4/2) = 0,5, tam sınırda uygun; yük 0,45 → sınırda; yük 0,6 → uygunsuz", () => {
    const a = yumusakYolVericiAkimSiniri.compute({ ...g, yukMomentOrani: 0.4 });
    expect(a.intermediates.min_baslangic_gerilimi_yuzde as number).toBeCloseTo(50, 8);
    expect(a.verdict?.status).toBe("uygun");
    expect(yumusakYolVericiAkimSiniri.compute({ ...g, yukMomentOrani: 0.45 }).verdict?.status).toBe("sinirda");
    expect(yumusakYolVericiAkimSiniri.compute({ ...g, yukMomentOrani: 0.6 }).verdict?.status).toBe("uygunsuz");
  });
  it("%100 gerilim = direkt yol", () => {
    const r = yumusakYolVericiAkimSiniri.compute({ ...g, baslangicGerilimi_yuzde: 100 });
    expect(r.value.kalkisAkimi_A).toBeCloseTo(700, 8);
  });
});
