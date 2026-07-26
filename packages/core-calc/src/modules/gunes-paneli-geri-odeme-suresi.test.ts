import { describe, expect, it } from "vitest";
import { gunesPaneliGeriOdemeSuresi } from "./gunes-paneli-geri-odeme-suresi";

describe("gunesPaneliGeriOdemeSuresi", () => {
  it("Yatırım=180000 TL, yıllık tasarruf=36000 TL → 5 yıl", () => {
    const r = gunesPaneliGeriOdemeSuresi.compute({
      yatirimMaliyeti_TL: 180000,
      yillikTasarruf_TL: 36000,
    });
    expect(r.value.geriOdemeSuresi_yil).toBeCloseTo(5, 3);
  });
});
