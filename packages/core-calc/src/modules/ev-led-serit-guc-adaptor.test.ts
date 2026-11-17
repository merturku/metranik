import { describe, it, expect } from "vitest";
import { evLedSeritGucAdaptor } from "./ev-led-serit-guc-adaptor";

describe("LED Şerit Güç ve Adaptör", () => {
  it("14,4 W/m, 5 m, 24 V: 72 W; 3 A; %20 yedekle 86,4 W adaptör; günlük 0,432 kWh", () => {
    const r = evLedSeritGucAdaptor.compute({ wm: 14.4, uzunluk_m: 5, gerilim_V: 24, yedek: 0.2 });
    expect(r.value.toplamGuc_W).toBeCloseTo(72, 10);
    expect(r.intermediates.akim_A as number).toBeCloseTo(3, 10);
    expect(r.intermediates.adaptor_gucu_W as number).toBeCloseTo(86.4, 10);
    expect(r.intermediates.kWh_gunluk_6saat as number).toBeCloseTo(0.432, 10);
  });
  it("gerilim yarısı (12 V) → akım iki katı", () => {
    expect(evLedSeritGucAdaptor.compute({ wm: 14.4, uzunluk_m: 5, gerilim_V: 12, yedek: 0 }).intermediates.akim_A as number).toBeCloseTo(6, 10);
  });
});
