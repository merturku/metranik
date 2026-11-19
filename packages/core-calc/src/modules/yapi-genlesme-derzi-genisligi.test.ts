import { describe, it, expect } from "vitest";
import { yapiGenlesmeDerziGenisligi } from "./yapi-genlesme-derzi-genisligi";

describe("Yapı Genleşme Derzi", () => {
  const g = { blokBoyu_m: 20, isilGenlesmeKatsayisi_1e6: 10, tasarimSicaklikFarki_K: 50, emniyetPayi: 0, derzDolguHareketKapasitesi_yuzde: 25, mevcutDerzGenisligi_mm: 30 };
  it("L=20 m, α=10e-6, ΔT=50 K: δ = 10 mm; MAC %25 → w = 40 mm", () => {
    const r = yapiGenlesmeDerziGenisligi.compute(g);
    expect(r.intermediates.serbest_isil_hareket_mm as number).toBeCloseTo(10, 10);
    expect(r.value.gerekliDerzGenisligi_mm).toBeCloseTo(40, 10);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("mevcut 30 mm derz için azami blok boyu 15 m; bu boyda w = 30 mm", () => {
    const r = yapiGenlesmeDerziGenisligi.compute(g);
    expect(r.intermediates.mevcut_derz_icin_azami_blok_boyu_m as number).toBeCloseTo(15, 10);
    expect(yapiGenlesmeDerziGenisligi.compute({ ...g, blokBoyu_m: 15 }).value.gerekliDerzGenisligi_mm).toBeCloseTo(30, 10);
  });
  it("emniyet payı %20 genişliği 1,2 katına çıkarır; yeterli derz uygun", () => {
    const r = yapiGenlesmeDerziGenisligi.compute({ ...g, emniyetPayi: 0.2, mevcutDerzGenisligi_mm: 50 });
    expect(r.value.gerekliDerzGenisligi_mm).toBeCloseTo(48, 10);
    expect(r.verdict?.status).toBe("uygun");
  });
});
