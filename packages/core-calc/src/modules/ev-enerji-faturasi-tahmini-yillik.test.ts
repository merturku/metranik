import { describe, it, expect } from "vitest";
import { evEnerjiTahminYillik } from "./ev-enerji-faturasi-tahmini-yillik";

describe("Yıllık Enerji Faturası", () => {
  it("100 kWh/ay, 5 TL/kWh, indirimsiz → 1200 kWh × 5 = 6000 TL/yıl", () => {
    const r = evEnerjiTahminYillik.compute({
      ortalama_tüketim_kwh_ay: 100,
      birim_fiyat_tlkwh: 5,
      peşin_indirim_yuzde: 0,
    });
    expect(r.value.net_fatura_TL).toBeCloseTo(6000, 6);
  });

  it("%10 peşin indirimle → 6000 × 0,9 = 5400 TL/yıl", () => {
    const r = evEnerjiTahminYillik.compute({
      ortalama_tüketim_kwh_ay: 100,
      birim_fiyat_tlkwh: 5,
      peşin_indirim_yuzde: 10,
    });
    expect(r.value.net_fatura_TL).toBeCloseTo(5400, 6);
  });
});
