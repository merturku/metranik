import { describe, it, expect } from "vitest";
import { panoHavalandirmaFaniDebisi } from "./pano-havalandirma-fani-debisi";

describe("Pano Havalandırma Fanı Debisi", () => {
  it("500 W, ΔT = 10 K, f = 1: V̇ = 500/(1206·10) = 0,04146 m³/s = 149,25 m³/h", () => {
    const r = panoHavalandirmaFaniDebisi.compute({ isiKaybi_W: 500, gunesKazanci_W: 0, izinVerilenSicaklikFarki_K: 10, guvenlikCarpani: 1 });
    expect(r.value.gerekliDebi_m3h).toBeCloseTo(149.25, 1);
    expect(r.intermediates.katalog_debisi_Ls as number).toBeCloseTo(41.46, 1);
  });
  it("güneş kazancı ve f = 1,3: (500 + 200)/(1206·10)·3600·1,3 = 271,6 m³/h", () => {
    const r = panoHavalandirmaFaniDebisi.compute({ isiKaybi_W: 500, gunesKazanci_W: 200, izinVerilenSicaklikFarki_K: 10, guvenlikCarpani: 1.3 });
    expect(r.value.gerekliDebi_m3h).toBeCloseTo(271.64, 1);
  });
  it("ΔT yarıya inerse debi iki katı", () => {
    const a = panoHavalandirmaFaniDebisi.compute({ isiKaybi_W: 500, gunesKazanci_W: 0, izinVerilenSicaklikFarki_K: 10, guvenlikCarpani: 1 }).value.gerekliDebi_m3h;
    const b = panoHavalandirmaFaniDebisi.compute({ isiKaybi_W: 500, gunesKazanci_W: 0, izinVerilenSicaklikFarki_K: 5, guvenlikCarpani: 1 }).value.gerekliDebi_m3h;
    expect(b / a).toBeCloseTo(2, 8);
  });
});
