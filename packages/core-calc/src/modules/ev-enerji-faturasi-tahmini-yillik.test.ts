import { describe, it, expect } from "vitest";
import { evEnerjiTahminYillik } from "./ev-enerji-faturasi-tahmini-yillik";

describe("Yıllık Enerji Faturası", () => {
  it("100 kWh/ay, 5 TL/kWh → 6000 TL/yıl", () => {
    const r = evEnerjiTahminYillik.compute({ ortalama_tüketim_kwh_ay: 100, birim_fiyat_tlkwh: 5 });
    expect(r.value.net_fatura_TL).toBeCloseTo(6000, 0);
  });
});
