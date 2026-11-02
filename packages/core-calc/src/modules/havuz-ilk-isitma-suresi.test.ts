import { describe, it, expect } from "vitest";
import { havuzIlkIsitmaSuresi } from "./havuz-ilk-isitma-suresi";

describe("Havuz İlk Isıtma Süresi", () => {
  it("50 m³, 15→26 °C: E = 50·1000·4,186·11/3600 = 639,5 kWh; 30 kW, η 0,8 → 26,6 saat", () => {
    const r = havuzIlkIsitmaSuresi.compute({ havuzHacmi_m3: 50, baslangicSicakligi_C: 15, hedefSicaklik_C: 26, isiticiGucu_kW: 30, netVerim: 0.8 });
    expect(r.intermediates.gerekli_enerji_kWh as number).toBeCloseTo(639.53, 1);
    expect(r.value.sure_saat).toBeCloseTo(26.65, 1);
    expect(r.intermediates.sure_gun as number).toBeCloseTo(1.11, 2);
  });
  it("hedef ≤ başlangıç → 0 saat", () => {
    expect(havuzIlkIsitmaSuresi.compute({ havuzHacmi_m3: 50, baslangicSicakligi_C: 28, hedefSicaklik_C: 26, isiticiGucu_kW: 30, netVerim: 0.8 }).value.sure_saat).toBe(0);
  });
});
