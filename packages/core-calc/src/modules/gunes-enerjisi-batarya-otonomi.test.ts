import { describe, expect, it } from "vitest";
import { gunesEnerjisiBataryaOtonomi } from "./gunes-enerjisi-batarya-otonomi";

describe("gunes-enerjisi-batarya-otonomi", () => {
  it("günlük 10 kWh, 2 gün otonomi, DoD=0.8, 48V → 520.83 Ah", () => {
    const r = gunesEnerjisiBataryaOtonomi.compute({
      gunlukTuketim_kWh: 10,
      otonomiGunSayisi: 2,
      izinVerilenDesarjDerinligi_DoD: 0.8,
      sistemGerilimi_V: 48,
    });

    expect(r.intermediates.gerekliEnerji_Wh).toBeCloseTo(25000, 2);
    expect(r.value.gerekliKapasite_Ah).toBeCloseTo(520.83, 2);
  });
});
