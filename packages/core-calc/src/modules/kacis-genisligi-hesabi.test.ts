import { describe, expect, it } from "vitest";
import { kacisGenisligiHesabi } from "./kacis-genisligi-hesabi";

describe("kacis-genisligi-hesabi", () => {
  it("300 kişi, 200 kişi/m, mevcut=1.8m → gerekli=1.5m, uygun", () => {
    const r = kacisGenisligiHesabi.compute({
      kisiSayisi: 300,
      birimGenislikKapasitesi_kisi_m: 200,
      mevcutGenislik_m: 1.8,
    });

    expect(r.value.gerekliGenislik_m).toBeCloseTo(1.5, 5);
    expect(r.intermediates.genislikMarji_m).toBeCloseTo(0.3, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("mevcut genişlik yetersizse uygunsuz", () => {
    const r = kacisGenisligiHesabi.compute({
      kisiSayisi: 300,
      birimGenislikKapasitesi_kisi_m: 200,
      mevcutGenislik_m: 1.2,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
