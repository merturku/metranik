import { describe, it, expect } from "vitest";
import { dogalgazTuketimSayacSecimi, dogalgazTuketimSayacSecimiInputSchema } from "./dogalgaz-tuketim-sayac-secimi";

const daire = {
  kombiKazanYuku_kW: 24,
  ocakYuku_kW: 8,
  digerCihazYuku_kW: 0,
  esZamanlilikKatsayisi: 1,
  altIsilDeger_Hu_kWhm3: 9.59,
};

describe("Doğalgaz Tüketim Debisi ve Sayaç Seçimi", () => {
  it("24 kW kombi + 8 kW ocak, Hu = 9,59 kWh/m³: 32/9,59 = 3,337 m³/h → G2,5 (Qmaks 4 m³/h, %83)", () => {
    const r = dogalgazTuketimSayacSecimi.compute(daire);
    expect(r.value.gazDebisi_m3h).toBeCloseTo(3.33681, 5);
    expect(r.intermediates.onerilen_sayac).toBe("G2,5");
    expect(r.intermediates.sayac_doluluk_yuzde).toBeCloseTo(83.42, 2);
  });

  it("Yalnız 24 kW kombi: 2,503 m³/h → G1,6 Qmaks 2,5'i az farkla aşar → G2,5", () => {
    const r = dogalgazTuketimSayacSecimi.compute({ ...daire, ocakYuku_kW: 0 });
    expect(r.value.gazDebisi_m3h).toBeCloseTo(2.50261, 5);
    expect(r.intermediates.onerilen_sayac).toBe("G2,5");
  });

  it("35 kW kombi + 8 kW ocak: 4,484 m³/h → G4; eşzamanlılık 0,8 ile 3,587 m³/h → G2,5", () => {
    expect(dogalgazTuketimSayacSecimi.compute({ ...daire, kombiKazanYuku_kW: 35 }).intermediates.onerilen_sayac).toBe("G4");
    const r = dogalgazTuketimSayacSecimi.compute({ ...daire, kombiKazanYuku_kW: 35, esZamanlilikKatsayisi: 0.8 });
    expect(r.value.gazDebisi_m3h).toBeCloseTo(3.58707, 5);
    expect(r.intermediates.onerilen_sayac).toBe("G2,5");
  });

  it("Çok büyük tesis G100'ü aşarsa özel sayaç; eşzamanlılık 1'i aşamaz", () => {
    const r = dogalgazTuketimSayacSecimi.compute({ ...daire, kombiKazanYuku_kW: 2000 });
    expect(r.intermediates.onerilen_sayac).toBe("> G100 (özel sayaç)");
    expect(dogalgazTuketimSayacSecimiInputSchema.safeParse({ ...daire, esZamanlilikKatsayisi: 1.2 }).success).toBe(false);
  });
});
