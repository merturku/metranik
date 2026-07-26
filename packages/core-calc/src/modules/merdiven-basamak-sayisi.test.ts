import { describe, expect, it } from "vitest";
import { merdivenBasamakSayisi } from "./merdiven-basamak-sayisi";

describe("merdiven-basamak-sayisi", () => {
  it("Kat yüksekliği=300cm, hedef rıht=17.65cm → 17 basamak, gerçek rıht ~17.65cm", () => {
    const r = merdivenBasamakSayisi.compute({
      katYuksekligi_cm: 300,
      rihtYuksekligi_cm: 17.65,
    });

    expect(r.value.basamakSayisi).toBe(17);
    expect(r.intermediates.gercekRihtYuksekligi_cm).toBeCloseTo(17.647, 2);
  });
});
