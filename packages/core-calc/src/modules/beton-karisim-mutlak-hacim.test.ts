import { describe, it, expect } from "vitest";
import { betonKarisimMutlakHacim } from "./beton-karisim-mutlak-hacim";

describe("Beton Karışımı Mutlak Hacim Yöntemi", () => {
  it("c 350, su 175, ρc 3,15, ρa 2,65, hava %2 → agrega hacmi 0,6939 m³ ≈ 1838,8 kg", () => {
    const r = betonKarisimMutlakHacim.compute({ cimento_kg: 350, su_kg: 175, cimentoYogunlugu: 3.15, agregaYogunlugu: 2.65, havaYuzdesi: 2 });
    expect(r.intermediates.agrega_hacmi_m3 as number).toBeCloseTo(0.69389, 4);
    expect(r.value.agrega_kg).toBeCloseTo(1838.8, 0);
    expect(r.intermediates.birim_agirlik_kgm3 as number).toBeCloseTo(2363.8, 0);
  });
  it("hacimler toplamı tam 1 m³ eder", () => {
    const r = betonKarisimMutlakHacim.compute({ cimento_kg: 400, su_kg: 200, cimentoYogunlugu: 3.15, agregaYogunlugu: 2.7, havaYuzdesi: 1.5 });
    const t = (r.intermediates.cimento_hacmi_m3 as number) + (r.intermediates.su_hacmi_m3 as number) + (r.intermediates.hava_hacmi_m3 as number) + (r.intermediates.agrega_hacmi_m3 as number);
    expect(t).toBeCloseTo(1, 12);
  });
});
