import { describe, it, expect } from "vitest";
import { evLaminatParkeMiktari } from "./ev-laminat-parke-miktari";

describe("Laminat / Parke Paket Sayısı", () => {
  it("24 m², %7 fire, 2,2 m²/paket: 25,68/2,2 = 11,67 → 12 paket", () => {
    const r = evLaminatParkeMiktari.compute({ alan_m2: 24, paketAlani_m2: 2.2, fireYuzde: 7 });
    expect(r.value.paketSayisi).toBe(12);
    expect(r.intermediates.fireli_alan_m2 as number).toBeCloseTo(25.68, 8);
    expect(r.intermediates.artan_alan_m2 as number).toBeCloseTo(2.4, 8);
  });
  it("tam sığma: 20 m², fire 0, 2 m²/paket → 10 paket (yukarı yuvarlama hatası yok)", () => {
    expect(evLaminatParkeMiktari.compute({ alan_m2: 20, paketAlani_m2: 2, fireYuzde: 0 }).value.paketSayisi).toBe(10);
  });
});
