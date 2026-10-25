import { describe, it, expect } from "vitest";
import { harmonikBozulmaThdKFaktoru } from "./harmonik-bozulma-thd-k-faktoru";

const olcum = {
  temelBilesenAkimi_I1_A: 100,
  harmonik3_A: 30,
  harmonik5_A: 20,
  harmonik7_A: 10,
  harmonik9_A: 0,
  harmonik11_A: 0,
  harmonik13_A: 0,
  izinVerilenThd_yuzde: 40,
};

describe("Akım Harmonik Bozulması (THD) ve K-Faktörü", () => {
  it("I1 = 100, I3 = 30, I5 = 20, I7 = 10 A: THD = √1400/100 = %37,42; Irms = 106,77 A; K = 33000/11400 = 2,895; In = 90 A", () => {
    const r = harmonikBozulmaThdKFaktoru.compute(olcum);
    expect(r.value.thd_yuzde).toBeCloseTo(37.4166, 4);
    expect(r.intermediates.toplam_efektif_akim_A).toBeCloseTo(106.7708, 4);
    expect(r.intermediates.k_faktoru).toBeCloseTo(2.89474, 5);
    expect(r.intermediates.notr_harmonik_akimi_A).toBeCloseTo(90, 6);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("9., 11., 13. harmonikler eklenince (5, 4, 3 A): THD = %38,08, K = 3,361, In = 3·√(30² + 5²) = 91,24 A", () => {
    const r = harmonikBozulmaThdKFaktoru.compute({
      ...olcum,
      harmonik9_A: 5,
      harmonik11_A: 4,
      harmonik13_A: 3,
      izinVerilenThd_yuzde: 30,
    });
    expect(r.value.thd_yuzde).toBeCloseTo(38.0789, 4);
    expect(r.intermediates.k_faktoru).toBeCloseTo(3.36087, 5);
    expect(r.intermediates.notr_harmonik_akimi_A).toBeCloseTo(91.2414, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
