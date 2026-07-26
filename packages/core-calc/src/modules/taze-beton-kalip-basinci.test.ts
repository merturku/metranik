import { describe, expect, it } from "vitest";
import { tazeBetonKalipBasinci } from "./taze-beton-kalip-basinci";

describe("taze-beton-kalip-basinci", () => {
  it("ACI 347: ρ=24, H=3m, R=2m/h, T=20°C → ACI formülü küçük çıkar, ~48.73 kPa", () => {
    const r = tazeBetonKalipBasinci.compute({
      betonBirimAgirlik_kNm3: 24,
      kalipYuksekligi_m: 3,
      birimAgirlikKatsayisi_Cw: 1.0,
      katkiKatsayisi_Cc: 1.0,
      dokmeHizi_R_mh: 2,
      betonSicakligi_T_C: 20,
    });

    expect(r.intermediates.hidrostatikBasinc_kPa).toBeCloseTo(72, 5);
    expect(r.intermediates.aciFormulBasinci_kPa).toBeCloseTo(48.734, 2);
    expect(r.value.tasarimBasinci_kPa).toBeCloseTo(48.734, 2);
  });

  it("çok yavaş dökme hızında hidrostatik basınç daha küçük çıkabilir", () => {
    const r = tazeBetonKalipBasinci.compute({
      betonBirimAgirlik_kNm3: 24,
      kalipYuksekligi_m: 1,
      birimAgirlikKatsayisi_Cw: 1.0,
      katkiKatsayisi_Cc: 1.0,
      dokmeHizi_R_mh: 5,
      betonSicakligi_T_C: 20,
    });

    expect(r.value.tasarimBasinci_kPa).toBeCloseTo(r.intermediates.hidrostatikBasinc_kPa as number, 5);
  });
});
