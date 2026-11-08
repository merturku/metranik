import { describe, it, expect } from "vitest";
import { cokYukluHatGerilimDusumu } from "./cok-yuklu-hat-gerilim-dusumu";

const taban = {
  faz: "3" as const, nominalGerilim_V: 400, iletken: "bakir" as const, kesit_mm2: 16, sicaklik_C: 20,
  reaktans_mOhm_m: 0.08, cosPhi: 0.8, izinVerilen_yuzde: 4,
  yuk1_A: 20, yuk1_mesafe_m: 50, yuk2_A: 10, yuk2_mesafe_m: 80, yuk3_A: 0, yuk3_mesafe_m: 0,
};

describe("Çok Yüklü Hat Gerilim Düşümü", () => {
  it("3 faz 400 V, 16 mm² Cu 20 °C: ΣIL = 1800 A·m, z = 0,000910 Ω/m → ΔU ≈ 2,837 V (%0,709)", () => {
    const r = cokYukluHatGerilimDusumu.compute(taban);
    expect(r.value.gerilimDusumu_V).toBeCloseTo(2.837, 2);
    expect(r.intermediates.gerilim_dusumu_yuzde as number).toBeCloseTo(0.709, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("tek yük için ΔU = √3·I·L·z (tek yüklü klasik formül ile aynı)", () => {
    const r = cokYukluHatGerilimDusumu.compute({ ...taban, yuk1_A: 30, yuk1_mesafe_m: 100, yuk2_A: 0, yuk2_mesafe_m: 0 });
    const z = (0.017241 / 16) * 0.8 + 0.00008 * 0.6;
    expect(r.value.gerilimDusumu_V).toBeCloseTo(Math.sqrt(3) * 30 * 100 * z, 8);
  });
  it("tek faz katsayısı 2, 70 °C'de direnç %19,65 artar", () => {
    const r1 = cokYukluHatGerilimDusumu.compute({ ...taban, faz: "1", nominalGerilim_V: 230, reaktans_mOhm_m: 0, cosPhi: 1 });
    expect(r1.value.gerilimDusumu_V).toBeCloseTo(2 * 1800 * (0.017241 / 16), 6);
    const r2 = cokYukluHatGerilimDusumu.compute({ ...taban, faz: "1", nominalGerilim_V: 230, reaktans_mOhm_m: 0, cosPhi: 1, sicaklik_C: 70 });
    expect(r2.value.gerilimDusumu_V / r1.value.gerilimDusumu_V).toBeCloseTo(1 + 0.00393 * 50, 6);
  });
  it("sınırı aşınca uygunsuz, sınırın %90'ı üstünde sınırda", () => {
    expect(cokYukluHatGerilimDusumu.compute({ ...taban, izinVerilen_yuzde: 0.5 }).verdict?.status).toBe("uygunsuz");
    expect(cokYukluHatGerilimDusumu.compute({ ...taban, izinVerilen_yuzde: 0.75 }).verdict?.status).toBe("sinirda");
  });
});
