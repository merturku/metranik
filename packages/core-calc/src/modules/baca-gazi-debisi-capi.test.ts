import { describe, it, expect } from "vitest";
import { bacaGaziDebisiCapi } from "./baca-gazi-debisi-capi";

describe("Baca Gazı Debisi ve Çapı", () => {
  it("500 kW, Hu 9,59, λ 1,2, 150 °C, 6 m/s: 12,4286 Nm³/Nm³; 648,0 Nm³/h; 0,27885 m³/s; D = 243,3 mm", () => {
    const r = bacaGaziDebisiCapi.compute({ yakitGucu_kW: 500, hu_kWhNm3: 9.59, fazlaHava: 1.2, bacaSicakligi_C: 150, hiz_ms: 6 });
    expect(r.intermediates.gaz_Nm3_per_Nm3 as number).toBeCloseTo(12.428571, 5);
    expect(r.intermediates.baca_gazi_Nm3h as number).toBeCloseTo(647.9964, 3);
    expect(r.intermediates.baca_gazi_m3s as number).toBeCloseTo(0.278845, 5);
    expect(r.value.bacaCapi_mm).toBeCloseTo(243.2546, 2);
  });
  it("λ = 1 stokiyometrik: 10,5238 Nm³/Nm³; hız dört katı → çap yarısı", () => {
    const a = bacaGaziDebisiCapi.compute({ yakitGucu_kW: 500, hu_kWhNm3: 9.59, fazlaHava: 1, bacaSicakligi_C: 150, hiz_ms: 6 });
    expect(a.intermediates.gaz_Nm3_per_Nm3 as number).toBeCloseTo(10.5238, 4);
    const b = bacaGaziDebisiCapi.compute({ yakitGucu_kW: 500, hu_kWhNm3: 9.59, fazlaHava: 1, bacaSicakligi_C: 150, hiz_ms: 24 });
    expect(b.value.bacaCapi_mm / a.value.bacaCapi_mm).toBeCloseTo(0.5, 10);
  });
});
