import { describe, expect, it } from "vitest";
import { yanginSondurucuSayisiKontrolu } from "./yangin-sondurucu-sayisi-kontrolu";

describe("yangin-sondurucu-sayisi-kontrolu", () => {
  it("Alan=350m², birim kapsama=280m² → gerekli 2 adet, mevcut 2 → uygun", () => {
    const r = yanginSondurucuSayisiKontrolu.compute({
      alan_m2: 350,
      birimKapsamaAlani_m2: 280,
      mevcutSonducuruSayisi: 2,
    });

    expect(r.value.gerekliSayi).toBe(2);
    expect(r.verdict?.status).toBe("uygun");
  });
});
