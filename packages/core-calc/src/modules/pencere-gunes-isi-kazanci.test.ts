import { describe, it, expect } from "vitest";
import { pencereGunesIsiKazanci } from "./pencere-gunes-isi-kazanci";

describe("Pencere Güneş Isı Kazancı", () => {
  const ornek = { pencereAlani_m2: 4, shgc: 0.4, gunesIsinimi_Wm2: 600, golgelemeCarpani: 1 };

  it("4·0,4·600 = 960 W (3275 Btu/h)", () => {
    const r = pencereGunesIsiKazanci.compute(ornek);
    expect(r.value.isiKazanci_W).toBeCloseTo(960, 9);
    expect(r.intermediates.isi_kazanci_Btuh).toBeCloseTo(3275.52, 2);
  });

  it("gölgeleme çarpanı 0,5 → 480 W, azalma 480 W", () => {
    const r = pencereGunesIsiKazanci.compute({ ...ornek, golgelemeCarpani: 0.5 });
    expect(r.value.isiKazanci_W).toBeCloseTo(480, 9);
    expect(r.intermediates.golgeleme_ile_azalma_W).toBeCloseTo(480, 9);
  });

  it("gece (0 W/m²) kazanç yok", () => {
    expect(pencereGunesIsiKazanci.compute({ ...ornek, gunesIsinimi_Wm2: 0 }).value.isiKazanci_W).toBe(0);
  });
});
