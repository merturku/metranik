import { describe, it, expect } from "vitest";
import { betonHacmiMikserSayisi } from "./beton-hacmi-mikser-sayisi";

describe("Beton Sipariş Hacmi ve Mikser Sayısı", () => {
  it("45 m³ + %3 = 46,35 m³; 8 m³ mikser → 6 sefer; 30 m³/h pompa → 1,545 saat", () => {
    const r = betonHacmiMikserSayisi.compute({ netHacim_m3: 45, fireYuzde: 3, mikserKapasitesi_m3: 8, pompaDebisi_m3h: 30 });
    expect(r.value.siparisHacmi_m3).toBeCloseTo(46.35, 9);
    expect(r.value.mikserSayisi).toBe(6);
    expect(r.intermediates.son_mikser_dolulugu_m3 as number).toBeCloseTo(6.35, 9);
    expect(r.intermediates.dokum_suresi_saat as number).toBeCloseTo(1.545, 9);
  });
  it("tam katı: 48 m³ firesiz → 6 sefer", () => {
    expect(betonHacmiMikserSayisi.compute({ netHacim_m3: 48, fireYuzde: 0, mikserKapasitesi_m3: 8, pompaDebisi_m3h: 30 }).value.mikserSayisi).toBe(6);
  });
});
