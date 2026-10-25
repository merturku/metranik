import { describe, it, expect } from "vitest";
import { wennerZeminOzdirenci, wennerZeminOzdirenciInputSchema } from "./wenner-zemin-ozdirenci";

const olcum = { elektrotAraligi_a_m: 3, olculenDirenc_R_ohm: 5, elektrotDerinligi_b_m: 0.2 };

describe("Zemin Özdirenci Ölçümü (Wenner Yöntemi)", () => {
  it("a = 3 m, R = 5 Ω, b = 0,2 m: payda = 1 + 6/√9,16 − 3/√9,04 = 1,98467 → ρ = 4π×3×5/1,98467 = 94,98 Ωm", () => {
    const r = wennerZeminOzdirenci.compute(olcum);
    expect(r.value.zeminOzdirenci_ohm_m).toBeCloseTo(94.9757, 3);
    expect(r.intermediates.basitlestirilmis_2piaR_ohm_m).toBeCloseTo(94.2478, 3);
  });

  it("Yüzeysel elektrotta (b = 0) tam formül 2π·a·R'ye eşit", () => {
    const r = wennerZeminOzdirenci.compute({ ...olcum, elektrotDerinligi_b_m: 0 });
    expect(r.value.zeminOzdirenci_ohm_m).toBeCloseTo(2 * Math.PI * 3 * 5, 9);
    expect(r.intermediates.basitlestirme_hatasi_yuzde).toBeCloseTo(0, 9);
  });

  it("Özdirenç ölçülen dirençle doğru orantılı", () => {
    const r = wennerZeminOzdirenci.compute({ ...olcum, olculenDirenc_R_ohm: 10 });
    expect(r.value.zeminOzdirenci_ohm_m).toBeCloseTo(2 * 94.9757, 3);
  });

  it("Elektrot derinliği aralıktan büyük olamaz", () => {
    expect(wennerZeminOzdirenciInputSchema.safeParse({ ...olcum, elektrotDerinligi_b_m: 4 }).success).toBe(false);
  });
});
