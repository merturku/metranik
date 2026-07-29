import { describe, expect, it } from "vitest";
import { malzemeFireZayiatOzeti } from "./malzeme-fire-zayiat-ozeti";

describe("malzeme-fire-zayiat-ozeti", () => {
  it("teorik=1000, fire=%8 → gerekli=1080, fire miktarı=80", () => {
    const r = malzemeFireZayiatOzeti.compute({
      teorikMiktar: 1000,
      fireOrani_yuzde: 8,
    });

    expect(r.value.gerekliMiktar).toBeCloseTo(1080, 5);
    expect(r.intermediates.fireMiktari).toBeCloseTo(80, 5);
  });
});
