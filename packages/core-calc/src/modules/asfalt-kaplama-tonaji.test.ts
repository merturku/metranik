import { describe, it, expect } from "vitest";
import { asfaltKaplamaTonaji } from "./asfalt-kaplama-tonaji";

describe("Asfalt Kaplama Tonajı", () => {
  it("7 m × 1000 m × 5 cm, 2,4 t/m³: 350 m³; 840 t; %3 fire 865,2 t; %5,5 bitüm 47,586 t; 120 kg/m²", () => {
    const r = asfaltKaplamaTonaji.compute({ genislik_m: 7, uzunluk_m: 1000, kalinlik_cm: 5, yogunluk_tm3: 2.4, firePayi: 0.03, bitumOrani: 0.055 });
    expect(r.intermediates.sikismis_hacim_m3 as number).toBeCloseTo(350, 8);
    expect(r.value.asfaltTonaji_t).toBeCloseTo(865.2, 6);
    expect(r.intermediates.bitum_ton as number).toBeCloseTo(47.586, 4);
    expect(r.intermediates.ton_per_m2 as number).toBeCloseTo(120, 8);
  });
  it("kalınlık iki katı → tonaj iki kat", () => {
    const g = { genislik_m: 7, uzunluk_m: 1000, yogunluk_tm3: 2.4, firePayi: 0, bitumOrani: 0.05 };
    expect(asfaltKaplamaTonaji.compute({ ...g, kalinlik_cm: 10 }).value.asfaltTonaji_t / asfaltKaplamaTonaji.compute({ ...g, kalinlik_cm: 5 }).value.asfaltTonaji_t).toBeCloseTo(2, 10);
  });
});
