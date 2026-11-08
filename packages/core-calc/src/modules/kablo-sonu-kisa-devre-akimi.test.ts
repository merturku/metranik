import { describe, it, expect } from "vitest";
import { kabloSonuKisaDevreAkimi } from "./kablo-sonu-kisa-devre-akimi";

const g = {
  nominalGerilim_V: 400, kaynakKisaDevreAkimi_kA: 20, kaynakR_X_orani: 0.1, gerilimFaktoru_c: 1,
  kabloR_mOhm_m: 1.15, kabloX_mOhm_m: 0.08, kabloUzunlugu_m: 50,
};

describe("Kablo Sonu Kısa Devre Akımı", () => {
  it("20 kA kaynak, 50 m kablo (1,15 + j0,08 mΩ/m): Rt = 0,058649, Xt = 0,015489 → Zt = 0,06066 Ω → Ik ≈ 3,807 kA", () => {
    const r = kabloSonuKisaDevreAkimi.compute(g);
    expect(r.intermediates.toplam_empedans_ohm as number).toBeCloseTo(0.06066, 4);
    expect(r.value.kisaDevreAkimi_kA).toBeCloseTo(3.807, 2);
  });
  it("kablo uzunluğu 0 → kaynak akımı aynen (20 kA)", () => {
    expect(kabloSonuKisaDevreAkimi.compute({ ...g, kabloUzunlugu_m: 0 }).value.kisaDevreAkimi_kA).toBeCloseTo(20, 8);
  });
  it("uzunluk arttıkça akım azalır; c çarpan olarak girer", () => {
    const a = kabloSonuKisaDevreAkimi.compute(g).value.kisaDevreAkimi_kA;
    expect(kabloSonuKisaDevreAkimi.compute({ ...g, kabloUzunlugu_m: 100 }).value.kisaDevreAkimi_kA).toBeLessThan(a);
    const hizli = kabloSonuKisaDevreAkimi.compute({ ...g, kabloUzunlugu_m: 0, gerilimFaktoru_c: 1.05 }).value.kisaDevreAkimi_kA;
    expect(hizli).toBeCloseTo(20, 8); // c hem kaynak hem hat için aynı → kaynak akımı korunur
  });
});
