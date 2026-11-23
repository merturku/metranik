import { describe, it, expect } from "vitest";
import { kazanDairesiHavalandirmaDebisi } from "./kazan-dairesi-havalandirma-debisi";

describe("Kazan Dairesi Havalandırma", () => {
  const g = { yakitGirisGucu_kW: 1000, altIsilDeger_kWh_m3: 9.59, fazlaHavaKatsayisi: 1.2, yayilanIsiOrani_yuzde: 1, izinVerilenSicaklikArtisi_K: 10 };
  it("1000 kW: gaz 104,28 m³/h → yanma 104,28·9,5238·1,2; soğutma 10 kW/(1,206·10)·3600", () => {
    const r = kazanDairesiHavalandirmaDebisi.compute(g);
    const yanma = (1000 / 9.59) * (2 / 0.21) * 1.2;
    const sog = (10 / (1.206 * 10)) * 3600;
    expect(r.intermediates.yanma_havasi_m3h as number).toBeCloseTo(yanma, 6);
    expect(r.intermediates.sogutma_havasi_m3h as number).toBeCloseTo(sog, 6);
    expect(r.value.toplamHavaDebisi_m3h).toBeCloseTo(yanma + sog, 6);
    expect(yanma).toBeCloseTo(1191.8, 0);
  });
  it("yayılan ısı 0 → yalnız yanma havası", () => {
    const r = kazanDairesiHavalandirmaDebisi.compute({ ...g, yayilanIsiOrani_yuzde: 0 });
    expect(r.intermediates.yanma_havasi_orani as number).toBe(1);
  });
});
