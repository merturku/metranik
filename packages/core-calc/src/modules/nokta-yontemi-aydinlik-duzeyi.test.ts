import { describe, it, expect } from "vitest";
import { noktaYontemiAydinlikDuzeyi, noktaYontemiAydinlikDuzeyiInputSchema } from "./nokta-yontemi-aydinlik-duzeyi";

const armatur = {
  isikSiddeti_cd: 1000,
  montajYuksekligi_h_m: 3,
  yatayMesafe_d_m: 4,
  bakimFaktoru: 1,
};

describe("Nokta Yöntemiyle Aydınlık Düzeyi", () => {
  it("1000 cd, h = 3 m, d = 4 m (3-4-5 üçgeni): r = 5 m, cos θ = 0,6; Eh = 1000×0,6/25 = 24 lx, Ev = 1000×0,8/25 = 32 lx", () => {
    const r = noktaYontemiAydinlikDuzeyi.compute(armatur);
    expect(r.intermediates.armature_uzaklik_r_m).toBeCloseTo(5, 9);
    expect(r.intermediates.gelis_acisi_derece).toBeCloseTo(53.1301, 4);
    expect(r.value.yatayAydinlikDuzeyi_lx).toBeCloseTo(24, 9);
    expect(r.intermediates.dusey_aydinlik_lx).toBeCloseTo(32, 9);
  });

  it("Armatürün tam altı (d = 0): Eh = I/h² = 1000/9 = 111,1 lx; bakım faktörü 0,8 ile 88,9 lx, Ev = 0", () => {
    const r = noktaYontemiAydinlikDuzeyi.compute({ ...armatur, yatayMesafe_d_m: 0, bakimFaktoru: 0.8 });
    expect(r.intermediates.yatay_baslangic_aydinlik_lx).toBeCloseTo(111.111, 3);
    expect(r.value.yatayAydinlikDuzeyi_lx).toBeCloseTo(88.889, 3);
    expect(r.intermediates.dusey_aydinlik_lx).toBeCloseTo(0, 9);
  });

  it("Montaj yüksekliği sıfır olamaz", () => {
    expect(noktaYontemiAydinlikDuzeyiInputSchema.safeParse({ ...armatur, montajYuksekligi_h_m: 0 }).success).toBe(false);
  });
});
