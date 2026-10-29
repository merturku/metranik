import { describe, it, expect } from "vitest";
import { rakimHavaYogunluguFanDuzeltmesi } from "./rakim-hava-yogunlugu-fan-duzeltmesi";

describe("Rakıma Göre Hava Yoğunluğu ve Fan Düzeltmesi", () => {
  it("deniz seviyesi 20 °C: p = 101,325 kPa, ρ = 1,2042 kg/m³ (standart hava ≈ 1,204)", () => {
    const r = rakimHavaYogunluguFanDuzeltmesi.compute({ rakim_m: 0, sicaklik_C: 20, katalogBasinci_Pa: 800, katalogMilGucu_kW: 5.5 });
    expect(r.intermediates.atmosfer_basinci_kPa).toBeCloseTo(101.325, 6);
    expect(r.value.havaYogunlugu_kgm3).toBeCloseTo(1.2042, 3);
  });

  it("1000 m: standart atmosfer basıncı 89,87 kPa (ISA 89,875), ρ = 1,0681", () => {
    const r = rakimHavaYogunluguFanDuzeltmesi.compute({ rakim_m: 1000, sicaklik_C: 20, katalogBasinci_Pa: 800, katalogMilGucu_kW: 5.5 });
    expect(r.intermediates.atmosfer_basinci_kPa).toBeCloseTo(89.875, 1);
    expect(r.value.havaYogunlugu_kgm3).toBeCloseTo(1.0681, 3);
  });

  it("fan basıncı ve gücü yoğunluk oranıyla küçülür (0,890)", () => {
    const r = rakimHavaYogunluguFanDuzeltmesi.compute({ rakim_m: 1000, sicaklik_C: 20, katalogBasinci_Pa: 800, katalogMilGucu_kW: 5.5 });
    expect(r.intermediates.yogunluk_orani_rho_rho_std).toBeCloseTo(0.89006, 4);
    expect(r.intermediates.duzeltilmis_fan_basinci_Pa).toBeCloseTo(712.05, 1);
    expect(r.intermediates.duzeltilmis_mil_gucu_kW).toBeCloseTo(4.8953, 3);
  });
});
