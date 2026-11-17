import { describe, it, expect } from "vitest";
import { isiPompasiKaynakSuyuDebisi } from "./isi-pompasi-kaynak-suyu-debisi";

describe("Isı Pompası Kaynak Suyu Debisi", () => {
  it("50 kW, COP 4,5, ΔT 4 K: Qevap = 38,889 kW; W = 11,111 kW; 2,3226 kg/s = 8,361 m³/h", () => {
    const r = isiPompasiKaynakSuyuDebisi.compute({ isitmaKapasitesi_kW: 50, cop: 4.5, deltaT_K: 4 });
    expect(r.intermediates.evaporator_isisi_kW as number).toBeCloseTo(38.8889, 3);
    expect(r.intermediates.kompresor_gucu_kW as number).toBeCloseTo(11.1111, 3);
    expect(r.intermediates.kaynak_debisi_kgs as number).toBeCloseTo(2.32256, 4);
    expect(r.value.kaynakDebisi_m3h).toBeCloseTo(8.3612, 3);
  });
  it("Qevap + W = Qh; ΔT yarısı → debi iki katı", () => {
    const r = isiPompasiKaynakSuyuDebisi.compute({ isitmaKapasitesi_kW: 80, cop: 3.2, deltaT_K: 5 });
    expect((r.intermediates.evaporator_isisi_kW as number) + (r.intermediates.kompresor_gucu_kW as number)).toBeCloseTo(80, 10);
    expect(isiPompasiKaynakSuyuDebisi.compute({ isitmaKapasitesi_kW: 80, cop: 3.2, deltaT_K: 2.5 }).value.kaynakDebisi_m3h / r.value.kaynakDebisi_m3h).toBeCloseTo(2, 10);
  });
});
