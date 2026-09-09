import { describe, expect, it } from "vitest";
import { dumanDedektoruSayisiKontrolu } from "./duman-dedektoru-sayisi-kontrolu";

describe("duman-dedektoru-sayisi-kontrolu", () => {
  it("Alan=120m², birim kapsama=40m² → gerekli 3 adet, mevcut 3 → uygun", () => {
    const r = dumanDedektoruSayisiKontrolu.compute({
      alan_m2: 120,
      birimKapsamaAlani_m2: 40,
      mevcutDedektorSayisi: 3,
    });

    expect(r.value.gerekliSayi).toBe(3);
    expect(r.verdict?.status).toBe("uygun");
  });
});
