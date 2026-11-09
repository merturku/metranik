import { describe, it, expect } from "vitest";
import { evDamlamaKacagiSuKaybi } from "./ev-damlama-kacagi-su-kaybi";

describe("Damlama Kaçağı Su Kaybı", () => {
  it("60 damla/dk × 0,05 mL = 3 mL/dk → 4,32 L/gün → 1576,8 L/yıl", () => {
    const r = evDamlamaKacagiSuKaybi.compute({ damlaSayisi_dk: 60, damlaHacmi_mL: 0.05, suBirimFiyati_TLm3: 50 });
    expect(r.intermediates.kacak_debisi_mL_dk as number).toBeCloseTo(3, 10);
    expect(r.intermediates.gunluk_kayip_L as number).toBeCloseTo(4.32, 8);
    expect(r.value.yillikKayip_L).toBeCloseTo(1576.8, 6);
    expect(r.intermediates.yillik_maliyet_TL as number).toBeCloseTo(78.84, 6);
  });
  it("ölçülen debi girişi (1 mL/damla hacmi): 10 mL/dk → 5256 L/yıl", () => {
    expect(evDamlamaKacagiSuKaybi.compute({ damlaSayisi_dk: 10, damlaHacmi_mL: 1, suBirimFiyati_TLm3: 0 }).value.yillikKayip_L).toBeCloseTo(5256, 6);
  });
});
