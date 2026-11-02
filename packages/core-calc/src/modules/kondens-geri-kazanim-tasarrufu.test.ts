import { describe, it, expect } from "vitest";
import { kondensGeriKazanimTasarrufu } from "./kondens-geri-kazanim-tasarrufu";

describe("Kondens Geri Kazanımı Tasarrufu", () => {
  const o = { kondensDebisi_kgh: 1000, geriDonusOrani: 0.8, kondensSicakligi_C: 90, makyajSuSicakligi_C: 15, kazanVerimi: 0.85, yakitFiyati_TLm3: 8, yillikSaat: 6000 };
  it("800 kg/h × 4,186 × 75 K / 3600 = 69,77 kW; η 0,85 → 8,559 m³/h; 6000 h → 51 353 m³; 410 826 ₺", () => {
    const r = kondensGeriKazanimTasarrufu.compute(o);
    expect(r.intermediates.geri_kazanilan_isi_kW as number).toBeCloseTo(69.767, 2);
    expect(r.intermediates.saatlik_yakit_m3 as number).toBeCloseTo(8.5588, 3);
    expect(r.value.yillikYakitTasarrufu_m3).toBeCloseTo(51353, -1);
    expect(r.intermediates.yillik_su_tasarrufu_m3 as number).toBeCloseTo(4800, 6);
  });
  it("geri dönüş yoksa tasarruf 0", () => {
    expect(kondensGeriKazanimTasarrufu.compute({ ...o, geriDonusOrani: 0 }).value.yillikYakitTasarrufu_m3).toBe(0);
  });
});
