import { describe, it, expect } from "vitest";
import { ledLumenWattEsdegeri } from "./led-lumen-watt-esdegeri";

describe("LED Lümen–Watt Eşdeğeri", () => {
  it("800 lm, LED 100 lm/W, eski 60 W akkor → 8 W; tasarruf 52 W (%86,7)", () => {
    const r = ledLumenWattEsdegeri.compute({ hedefLumen_lm: 800, ledEtkinligi_lmW: 100, eskiLambaGucu_W: 60 });
    expect(r.value.ledGucu_W).toBeCloseTo(8, 9);
    expect(r.intermediates.tasarruf_W as number).toBeCloseTo(52, 9);
    expect(r.intermediates.tasarruf_yuzde as number).toBeCloseTo(86.667, 2);
    expect(r.intermediates.eski_lamba_etkinligi_lmW as number).toBeCloseTo(13.333, 2);
  });
});
