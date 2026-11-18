import { describe, it, expect } from "vitest";
import { kompresorOzgulGucEnerjiMaliyeti } from "./kompresor-ozgul-guc-enerji-maliyeti";

describe("Kompresör Özgül Güç ve Maliyeti", () => {
  it("75 kW, 12,5 m³/dk: 6 kW/(m³/dk); 0,1 kWh/m³; 315 000 kWh/yıl; 1,26 M₺; 1000 m³ = 400 ₺", () => {
    const r = kompresorOzgulGucEnerjiMaliyeti.compute({ guc_kW: 75, fad_m3dk: 12.5, yukOrani: 0.7, saat_h: 6000, fiyat: 4 });
    expect(r.value.ozgulGuc).toBeCloseTo(6, 10);
    expect(r.intermediates.kWh_per_m3 as number).toBeCloseTo(0.1, 10);
    expect(r.intermediates.yillik_enerji_kWh as number).toBeCloseTo(315000, 6);
    expect(r.intermediates.yillik_maliyet as number).toBeCloseTo(1260000, 4);
    expect(r.intermediates.maliyet_1000m3 as number).toBeCloseTo(400, 8);
  });
  it("debi iki katı (aynı güç) → özgül güç yarısı", () => {
    const a = kompresorOzgulGucEnerjiMaliyeti.compute({ guc_kW: 75, fad_m3dk: 12.5, yukOrani: 1, saat_h: 1, fiyat: 1 }).value.ozgulGuc;
    expect(kompresorOzgulGucEnerjiMaliyeti.compute({ guc_kW: 75, fad_m3dk: 25, yukOrani: 1, saat_h: 1, fiyat: 1 }).value.ozgulGuc / a).toBeCloseTo(0.5, 10);
  });
});
