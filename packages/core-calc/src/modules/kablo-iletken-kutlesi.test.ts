import { describe, it, expect } from "vitest";
import { kabloIletkenKutlesi } from "./kablo-iletken-kutlesi";

describe("Kablo İletken Metal Kütlesi", () => {
  it("4×16 mm² Cu, 100 m → 16e-6·4·8960·100 = 57,34 kg", () => {
    const r = kabloIletkenKutlesi.compute({ kesit_mm2: 16, damarSayisi: 4, uzunluk_m: 100, malzeme: "bakir" });
    expect(r.value.kutle_kg).toBeCloseTo(57.34, 2);
    expect(r.intermediates.birim_uzunluk_kutlesi_kgm as number).toBeCloseTo(0.5734, 4);
  });
  it("aynı kesitte Al, Cu'nun 2700/8960 katı", () => {
    const cu = kabloIletkenKutlesi.compute({ kesit_mm2: 16, damarSayisi: 4, uzunluk_m: 100, malzeme: "bakir" }).value.kutle_kg;
    const al = kabloIletkenKutlesi.compute({ kesit_mm2: 16, damarSayisi: 4, uzunluk_m: 100, malzeme: "aluminyum" }).value.kutle_kg;
    expect(al / cu).toBeCloseTo(2700 / 8960, 9);
  });
});
