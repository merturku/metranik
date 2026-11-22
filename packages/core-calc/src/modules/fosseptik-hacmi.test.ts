import { describe, it, expect } from "vitest";
import { fosseptikHacmi } from "./fosseptik-hacmi";

describe("Fosseptik Hacmi", () => {
  const g = { kisiSayisi: 5, gunlukAtikSu_Lkisigun: 150, beklemeSuresi_gun: 2, camurBirikimi_Lkisiyil: 40, temizlemeAraligi_yil: 3, tankDerinligi_m: 1.5, enBoyOrani: 2 };
  it("5 kişi: sıvı 1,5 m³ + çamur 0,6 m³ = 2,1 m³; alan 1,4 m²; en 0,8367 m, boy 1,6733 m", () => {
    const r = fosseptikHacmi.compute(g);
    expect(r.intermediates.sivi_hacmi_m3 as number).toBeCloseTo(1.5, 10);
    expect(r.intermediates.camur_hacmi_m3 as number).toBeCloseTo(0.6, 10);
    expect(r.value.toplamHacim_m3).toBeCloseTo(2.1, 10);
    expect(r.intermediates.plan_alani_m2 as number).toBeCloseTo(1.4, 10);
    const en = r.intermediates.tank_eni_m as number;
    expect(en).toBeCloseTo(0.83666, 5);
    expect((r.intermediates.tank_boyu_m as number) * en * 1.5).toBeCloseTo(2.1, 10);
  });
  it("kişi sayısı iki katına çıkınca hacim iki katı; bekletme < 1 gün sınırda", () => {
    expect(fosseptikHacmi.compute({ ...g, kisiSayisi: 10 }).value.toplamHacim_m3).toBeCloseTo(4.2, 10);
    expect(fosseptikHacmi.compute({ ...g, beklemeSuresi_gun: 0.5 }).verdict?.status).toBe("sinirda");
  });
});
