import { describe, it, expect } from "vitest";
import { wobbeIndeksiYakitDegisimi } from "./wobbe-indeksi-yakit-degisimi";

describe("Wobbe İndeksi ve Gaz Değişimi", () => {
  const g = { referansUstIsilDeger_MJm3: 39.9, referansBagilYogunluk: 0.555, yeniUstIsilDeger_MJm3: 45.7, yeniBagilYogunluk: 0.65, izinVerilenSapma_yuzde: 5 };
  it("W1 = 39,9/√0,555 = 53,558; W2 = 45,7/√0,65 = 56,684; sapma %5,836", () => {
    const r = wobbeIndeksiYakitDegisimi.compute(g);
    expect(r.intermediates.referans_Wobbe_MJm3 as number).toBeCloseTo(53.5583, 3);
    expect(r.value.yeniWobbe_MJm3).toBeCloseTo(56.6839, 3);
    expect(r.intermediates.Wobbe_sapmasi_yuzde as number).toBeCloseTo(5.8359, 3);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("izin %6 uygun; %2 uygunsuz; aynı gaz → sapma 0", () => {
    expect(wobbeIndeksiYakitDegisimi.compute({ ...g, izinVerilenSapma_yuzde: 6 }).verdict?.status).toBe("uygun");
    expect(wobbeIndeksiYakitDegisimi.compute({ ...g, izinVerilenSapma_yuzde: 2 }).verdict?.status).toBe("uygunsuz");
    const ayni = wobbeIndeksiYakitDegisimi.compute({ ...g, yeniUstIsilDeger_MJm3: 39.9, yeniBagilYogunluk: 0.555 });
    expect(ayni.intermediates.Wobbe_sapmasi_yuzde as number).toBeCloseTo(0, 10);
  });
});
