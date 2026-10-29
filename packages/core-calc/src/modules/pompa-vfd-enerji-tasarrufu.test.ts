import { describe, it, expect } from "vitest";
import { pompaVfdEnerjiTasarrufu } from "./pompa-vfd-enerji-tasarrufu";

// 15 kW, n2/n1 = 0,8 → P2 = 15·0,512 = 7,68 kW; tasarruf 7,32 kW × 4000 h = 29 280 kWh; 5 birim/kWh → 146 400.
const ornek = { nominalGuc_kW: 15, devirOrani: 0.8, yillikCalismaSaati_h: 4000, birimFiyat: 5 };

describe("Pompa/Fan Devir Düşürme Enerji Tasarrufu", () => {
  it("P2 = 7,68 kW, yıllık tasarruf 29 280 kWh", () => {
    const r = pompaVfdEnerjiTasarrufu.compute(ornek);
    expect(r.intermediates.yeni_guc_kW).toBeCloseTo(7.68, 9);
    expect(r.value.yillikTasarruf_kWh).toBeCloseTo(29280, 6);
    expect(r.intermediates.yillik_maliyet_tasarrufu).toBeCloseTo(146400, 4);
  });

  it("devir %50'ye inince güç %12,5'e düşer (küp yasası)", () => {
    const r = pompaVfdEnerjiTasarrufu.compute({ ...ornek, devirOrani: 0.5 });
    expect(r.intermediates.guc_orani_P2_P1).toBeCloseTo(0.125, 12);
    expect(r.intermediates.tasarruf_yuzdesi).toBeCloseTo(87.5, 9);
  });

  it("tam devirde tasarruf yoktur", () => {
    expect(pompaVfdEnerjiTasarrufu.compute({ ...ornek, devirOrani: 1 }).value.yillikTasarruf_kWh).toBeCloseTo(0, 9);
  });
});
