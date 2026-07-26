import { describe, expect, it } from "vitest";
import { klimaKapasiteSecimi } from "./klima-kapasite-secimi";

describe("klima-kapasite-secimi", () => {
  it("20 m² oda, 600 BTU/m², ek kişi yok → 12.000 BTU (1 ton)", () => {
    const r = klimaKapasiteSecimi.compute({ alan_m2: 20, katsayi_BTU_m2: 600, ekKisiSayisi: 0 });

    expect(r.value.gerekliKapasite_BTU).toBeCloseTo(12000, 5);
    expect(r.value.tonKapasite).toBeCloseTo(1, 5);
  });

  it("ek kişi sayısı kapasiteyi artırır", () => {
    const r = klimaKapasiteSecimi.compute({ alan_m2: 20, katsayi_BTU_m2: 600, ekKisiSayisi: 3 });

    expect(r.intermediates.kisiEklemesi_BTU).toBeCloseTo(1800, 5);
    expect(r.value.gerekliKapasite_BTU).toBeCloseTo(13800, 5);
  });
});
