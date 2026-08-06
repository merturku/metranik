import { describe, expect, it } from "vitest";
import { rampaEgimKontrolu } from "./rampa-egim-kontrolu";

describe("rampa-egim-kontrolu", () => {
  it("yükseklik=0.6m, uzunluk=8m, izin=%8 → %7.5, uygun", () => {
    const r = rampaEgimKontrolu.compute({
      yukseklik_m: 0.6,
      rampaUzunlugu_m: 8,
      izinVerilenEgim_yuzde: 8,
    });

    expect(r.value.egim_yuzde).toBeCloseTo(7.5, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("çok kısa/dik rampada sınır aşılır → uygunsuz", () => {
    const r = rampaEgimKontrolu.compute({
      yukseklik_m: 1,
      rampaUzunlugu_m: 6,
      izinVerilenEgim_yuzde: 8,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
