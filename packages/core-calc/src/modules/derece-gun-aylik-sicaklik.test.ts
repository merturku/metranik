import { describe, it, expect } from "vitest";
import { dereceGunAylikSicaklik } from "./derece-gun-aylik-sicaklik";

describe("Aylık Sıcaklıklardan Derece-Gün", () => {
  const g = { ocak: 5.3, subat: 5.5, mart: 7.1, nisan: 11.4, mayis: 16.0, haziran: 20.6, temmuz: 23.2, agustos: 23.4, eylul: 19.8, ekim: 15.6, kasim: 11.2, aralik: 7.4, denge_Tb_C: 15 };
  it("örnek veri, Tb = 15: DG = 300,7 + 266 + 244,9 + 108 + 114 + 235,6 = 1269,2; sezon 181 gün", () => {
    const r = dereceGunAylikSicaklik.compute(g);
    expect(r.value.dereceGun_Kgun).toBeCloseTo(1269.2, 8);
    expect(r.intermediates.isitma_sezonu_gun).toBe(181);
    expect(r.intermediates.en_soguk_ay).toBe("ocak");
  });
  it("tüm aylar Tb'nin üstündeyse DG = 0", () => {
    const sicak = { ...g, ocak: 20, subat: 20, mart: 20, nisan: 20, mayis: 20, aralik: 20, kasim: 20, ekim: 20, denge_Tb_C: 15 };
    expect(dereceGunAylikSicaklik.compute(sicak).value.dereceGun_Kgun).toBe(0);
  });
  it("her ay 0 °C, Tb = 15: DG = 15 × 365 = 5475", () => {
    const sifir = { ocak: 0, subat: 0, mart: 0, nisan: 0, mayis: 0, haziran: 0, temmuz: 0, agustos: 0, eylul: 0, ekim: 0, kasim: 0, aralik: 0, denge_Tb_C: 15 };
    expect(dereceGunAylikSicaklik.compute(sifir).value.dereceGun_Kgun).toBe(5475);
  });
});
