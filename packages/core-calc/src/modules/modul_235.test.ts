import { describe, it, expect } from "vitest";
import { modul_235 } from "./modul_235";

describe("Kanal Tasarım Hava Hızı Kontrolü", () => {
  it("ASHRAE 90.1: 1 m³/s, 0.4×0.4m kanal → v=6.25 m/s", () => {
    const r = modul_235.compute({
      hava_debisi_m3s: 1,
      kanal_genisligi_m: 0.4,
      kanal_yuksekligi_m: 0.4,
    });

    expect(r.value.hava_hizi_ms).toBeCloseTo(6.25, 1);
  });
});
