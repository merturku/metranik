import { describe, it, expect } from "vitest";
import { ustKatSuBasinciKontrolu, ustKatSuBasinciKontroluInputSchema } from "./ust-kat-su-basinci-kontrolu";

const bina = {
  sebekeBasinci_bar: 3,
  yukseklikFarki_m: 15,
  boruKayiplari_bar: 0.5,
  asgariMuslukBasinci_bar: 1,
  azamiStatikBasinc_bar: 5,
};

describe("Üst Kat Su Basıncı ve Hidrofor İhtiyacı", () => {
  it("3 bar şebeke, 15 m yükseklik, 0,5 bar kayıp: Püst = 3 − 0,0981 × 15 − 0,5 = 1,0285 bar ≥ 1 bar → uygun", () => {
    const r = ustKatSuBasinciKontrolu.compute(bina);
    expect(r.value.ustKatBasinci_bar).toBeCloseTo(1.0285, 10);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Hidroforsuz çıkılabilecek azami yükseklik = (3 − 0,5 − 1)/0,0981 = 15,29 m", () => {
    const r = ustKatSuBasinciKontrolu.compute(bina);
    expect(r.intermediates.hidroforsuz_azami_yukseklik_m).toBeCloseTo(15.29052, 4);
  });

  it("24 m'de Püst = 0,1456 bar < 1 bar → uygunsuz, gereken basınç artışı 0,8544 bar = 8,71 mSS", () => {
    const r = ustKatSuBasinciKontrolu.compute({ ...bina, yukseklikFarki_m: 24 });
    expect(r.value.ustKatBasinci_bar).toBeCloseTo(0.1456, 10);
    expect(r.intermediates.gereken_basinc_artisi_bar).toBeCloseTo(0.8544, 10);
    expect(r.intermediates.gereken_basinc_artisi_mSS).toBeCloseTo(8.70948, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("6 bar şebekede üst kat yeterli ama alt kat statik basıncı 5 bar'ı aşıyor → sınırda (basınç düşürücü)", () => {
    const r = ustKatSuBasinciKontrolu.compute({ ...bina, sebekeBasinci_bar: 6 });
    expect(r.value.ustKatBasinci_bar).toBeCloseTo(4.0285, 10);
    expect(r.intermediates.gereken_basinc_artisi_bar).toBe(0);
    expect(r.verdict?.status).toBe("sinirda");
    expect(r.verdict?.note).toContain("basınç düşürücü");
    expect(ustKatSuBasinciKontroluInputSchema.safeParse({ ...bina, yukseklikFarki_m: -5 }).success).toBe(false);
  });
});
