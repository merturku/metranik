import { describe, it, expect } from "vitest";
import { mutlakNemBagilNemDonusumu } from "./mutlak-nem-bagil-nem-donusumu";

describe("Bağıl/Mutlak/Özgül Nem", () => {
  it("20 °C, %50, 1013,25 hPa: Magnus Psat = 23,33 hPa (tablo 23,39, %0,3); ρv = 8,62 g/m³; W = 7,24 g/kg; çiy noktası 9,26 °C", () => {
    const r = mutlakNemBagilNemDonusumu.compute({ sicaklik_C: 20, bagilNem_yuzde: 50, toplamBasinc_hPa: 1013.25 });
    expect(r.intermediates.doyma_buhar_basinci_hPa as number).toBeCloseTo(23.33, 1);
    expect(r.value.mutlakNem_gm3).toBeCloseTo(8.62, 1);
    expect(r.intermediates.ozgul_nem_gkg as number).toBeCloseTo(7.24, 1);
    expect(r.intermediates.ciy_noktasi_C as number).toBeCloseTo(9.26, 1);
  });
  it("%100'de doygun mutlak nem 17,24 g/m³ (tablo 17,3) (20 °C) ve çiy noktası = sıcaklık", () => {
    const r = mutlakNemBagilNemDonusumu.compute({ sicaklik_C: 20, bagilNem_yuzde: 100, toplamBasinc_hPa: 1013.25 });
    expect(r.value.mutlakNem_gm3).toBeCloseTo(17.24, 1);
    expect(r.intermediates.ciy_noktasi_C as number).toBeCloseTo(20, 6);
  });
  it("%0 bağıl nemde mutlak nem 0", () => {
    expect(mutlakNemBagilNemDonusumu.compute({ sicaklik_C: 25, bagilNem_yuzde: 0, toplamBasinc_hPa: 1013 }).value.mutlakNem_gm3).toBe(0);
  });
});
