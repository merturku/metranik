import { describe, expect, it } from "vitest";
import { panoSicaklikArtisiKontrolu } from "./pano-sicaklik-artisi-kontrolu";

describe("pano-sicaklik-artisi-kontrolu", () => {
  it("sıcaklık artışı izin verilen sınırın altındaysa uygun döner", () => {
    const r = panoSicaklikArtisiKontrolu.compute({
      ortamSicakligi_C: 25,
      olculenSicaklik_C: 70,
      izinVerilenSicaklikArtisi_K: 65,
    });

    expect(r.value.marj_K).toBeCloseTo(20, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("sıcaklık artışı sınırı aşarsa uygunsuz döner", () => {
    const r = panoSicaklikArtisiKontrolu.compute({
      ortamSicakligi_C: 25,
      olculenSicaklik_C: 100,
      izinVerilenSicaklikArtisi_K: 65,
    });

    expect(r.value.marj_K).toBeCloseTo(-10, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
