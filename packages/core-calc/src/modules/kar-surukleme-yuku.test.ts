import { describe, expect, it } from "vitest";
import { karSuruklemeYuku } from "./kar-surukleme-yuku";

describe("kar-surukleme-yuku", () => {
  it("h=1.5m, γ=2 kN/m³, sk=0.75 kN/m², Ce=Ct=1, μ sınırı 0.8-4 → μw=4 (sınırlı), s=3.0 kN/m²", () => {
    const r = karSuruklemeYuku.compute({
      engelYuksekligi_h_m: 1.5,
      karOzgulAgirligi_gamma_kNm3: 2,
      karakteristikKarYuku_sk_kNm2: 0.75,
      maruziyetKatsayisi_Ce: 1,
      isilKatsayi_Ct: 1,
      minSuruklemeKatsayisi_muMin: 0.8,
      maxSuruklemeKatsayisi_muMax: 4,
    });

    expect(r.intermediates.hesaplananSuruklemeKatsayisi_muw).toBeCloseTo(4, 5);
    expect(r.intermediates.sinirlanmisSuruklemeKatsayisi_muw).toBeCloseTo(4, 5);
    expect(r.value.suruklemeYuku_s_kNm2).toBeCloseTo(3.0, 5);
  });
});
