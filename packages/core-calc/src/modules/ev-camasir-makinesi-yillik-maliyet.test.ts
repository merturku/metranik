import { describe, it, expect } from "vitest";
import { evCamasirMakinesiYillikMaliyet } from "./ev-camasir-makinesi-yillik-maliyet";

describe("Çamaşır Makinesi Yıllık Maliyeti", () => {
  it("4 döngü/hf → 208 döngü; 0,8 kWh → 166,4 kWh (499,2 ₺); 50 L → 10,4 m³ (520 ₺); toplam 1019,2 ₺", () => {
    const r = evCamasirMakinesiYillikMaliyet.compute({ haftalikDongu: 4, donguBasinaEnerji_kWh: 0.8, donguBasinaSu_L: 50, donguBasinaDeterjan_TL: 0, elektrikFiyati_TLkWh: 3, suFiyati_TLm3: 50 });
    expect(r.intermediates.yillik_dongu).toBe(208);
    expect(r.intermediates.yillik_enerji_kWh as number).toBeCloseTo(166.4, 8);
    expect(r.intermediates.elektrik_maliyeti_TL as number).toBeCloseTo(499.2, 6);
    expect(r.intermediates.su_maliyeti_TL as number).toBeCloseTo(520, 6);
    expect(r.value.yillikMaliyet_TL).toBeCloseTo(1019.2, 6);
  });
  it("deterjan eklenir; döngü yoksa döngü başına maliyet tanımsız", () => {
    expect(evCamasirMakinesiYillikMaliyet.compute({ haftalikDongu: 2, donguBasinaEnerji_kWh: 0, donguBasinaSu_L: 0, donguBasinaDeterjan_TL: 5, elektrikFiyati_TLkWh: 3, suFiyati_TLm3: 50 }).value.yillikMaliyet_TL).toBeCloseTo(520, 6);
    expect(evCamasirMakinesiYillikMaliyet.compute({ haftalikDongu: 0, donguBasinaEnerji_kWh: 1, donguBasinaSu_L: 1, donguBasinaDeterjan_TL: 1, elektrikFiyati_TLkWh: 1, suFiyati_TLm3: 1 }).intermediates.dongu_basina_maliyet_TL).toBe("—");
  });
});
