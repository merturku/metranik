import { describe, it, expect } from "vitest";
import { evOhmYasasiGuc } from "./ev-ohm-yasasi-guc";

describe("Ohm Yasası ve Güç", () => {
  it("230 V, 50 Ω: 4,6 A; 1058 W", () => {
    const r = evOhmYasasiGuc.compute({ cift: "VR", x1: 230, x2: 50 });
    expect(r.intermediates.akim_A as number).toBeCloseTo(4.6, 10);
    expect(r.value.guc_W).toBeCloseTo(1058, 8);
  });
  it("her çift aynı (V, I, R, P) dörtlüsünü verir: V 12, I 2 → R 6, P 24", () => {
    const beklenen = { V: 12, I: 2, R: 6, P: 24 };
    const kontrol = (cift: "VI" | "VR" | "VP" | "IR" | "IP" | "RP", x1: number, x2: number) => {
      const r = evOhmYasasiGuc.compute({ cift, x1, x2 });
      expect(r.intermediates.gerilim_V as number).toBeCloseTo(beklenen.V, 8);
      expect(r.intermediates.akim_A as number).toBeCloseTo(beklenen.I, 8);
      expect(r.intermediates.direnc_ohm as number).toBeCloseTo(beklenen.R, 8);
      expect(r.value.guc_W).toBeCloseTo(beklenen.P, 8);
    };
    kontrol("VI", 12, 2);
    kontrol("VR", 12, 6);
    kontrol("VP", 12, 24);
    kontrol("IR", 2, 6);
    kontrol("IP", 2, 24);
    kontrol("RP", 6, 24);
  });
});
