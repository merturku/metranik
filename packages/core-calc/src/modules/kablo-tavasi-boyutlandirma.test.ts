import { describe, expect, it } from "vitest";
import { kabloTavasiBoyutlandirma } from "./kablo-tavasi-boyutlandirma";

describe("kablo-tavasi-boyutlandirma", () => {
  it("toplam kesit=4000mm², çok katmanlı (%50), yükseklik=100mm → 80mm genişlik", () => {
    const r = kabloTavasiBoyutlandirma.compute({
      kabloKesitAlanlariToplami_mm2: 4000,
      dizilimTipi: "cok",
      tavaYuksekligi_mm: 100,
    });

    expect(r.intermediates.gerekliTavaKesitAlani_mm2).toBeCloseTo(8000, 5);
    expect(r.value.gerekliGenislik_mm).toBeCloseTo(80, 5);
  });
});
