import { describe, it, expect } from "vitest";
import { evPencereSacakDerinligi } from "./ev-pencere-sacak-derinligi";

describe("Pencere Saçak Derinliği", () => {
  it("a = 0,2, Hp = 1,2, αp = 60°: D = 1,4/√3 = 0,8083 m; bu derinlikte tam gölge", () => {
    const r = evPencereSacakDerinligi.compute({ saca_pencere_mesafesi_m: 0.2, pencereYuksekligi_m: 1.2, profilAcisi_derece: 60, mevcutDerinlik_m: 0.8083 });
    expect(r.value.gerekliDerinlik_m).toBeCloseTo(0.8083, 3);
    expect(r.intermediates.mevcut_golgelenen_oran as number).toBeCloseTo(1, 3);
  });
  it("D = 0,4 m, 60°: gölge boyu 0,4·√3 − 0,2 = 0,4928 m → %41,07", () => {
    const r = evPencereSacakDerinligi.compute({ saca_pencere_mesafesi_m: 0.2, pencereYuksekligi_m: 1.2, profilAcisi_derece: 60, mevcutDerinlik_m: 0.4 });
    expect(r.intermediates.mevcut_golgelenen_yuzde as number).toBeCloseTo(41.07, 1);
  });
  it("D = 0 → gölge yok (%0); düşük güneş açısında derinlik büyür", () => {
    const g = { saca_pencere_mesafesi_m: 0.2, pencereYuksekligi_m: 1.2 };
    expect(evPencereSacakDerinligi.compute({ ...g, profilAcisi_derece: 60, mevcutDerinlik_m: 0 }).intermediates.mevcut_golgelenen_oran).toBe(0);
    expect(evPencereSacakDerinligi.compute({ ...g, profilAcisi_derece: 30, mevcutDerinlik_m: 0 }).value.gerekliDerinlik_m).toBeCloseTo(1.4 / Math.tan(Math.PI / 6), 8);
  });
});
