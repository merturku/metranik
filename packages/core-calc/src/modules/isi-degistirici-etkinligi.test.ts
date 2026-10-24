import { describe, expect, it } from "vitest";
import { isiDegistiriciEtkinligi } from "./isi-degistirici-etkinligi";

describe("isiDegistiriciEtkinligi", () => {
  it("Th,in=90°C, Th,out=60°C, Tc,in=20°C → ε≈0.4286", () => {
    const r = isiDegistiriciEtkinligi.compute({
      sicakGirisSicakligi_ThIn_C: 90,
      sicakCikisSicakligi_ThOut_C: 60,
      sogukGirisSicakligi_TcIn_C: 20,
    });
    expect(r.value.etkinlik_epsilon).toBeCloseTo(0.42857, 4);
  });
});
