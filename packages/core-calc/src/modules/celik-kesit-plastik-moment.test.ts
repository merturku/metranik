import { describe, it, expect } from "vitest";
import { celikKesitPlastikMoment } from "./celik-kesit-plastik-moment";

const base = { genislik_b_mm: 100, yukseklik_h_mm: 200, govdeKalinligi_tw_mm: 0, basliKalinligi_tf_mm: 0, akmaDayanimi_MPa: 355, gammaM0: 1 };

describe("Çelik Kesit Plastik Moment", () => {
  it("dikdörtgen 100×200: Wel 666 667, Wpl 1 000 000 mm³, α = 1,5, Mpl = 355 kNm", () => {
    const r = celikKesitPlastikMoment.compute({ ...base, kesitTipi: "dikdortgen" });
    expect(r.intermediates.Wel_mm3 as number).toBeCloseTo(666666.667, 2);
    expect(r.intermediates.Wpl_mm3 as number).toBeCloseTo(1e6, 6);
    expect(r.intermediates.sekil_faktoru_alfa as number).toBeCloseTo(1.5, 10);
    expect(r.value.plastikMomentDayanimi_kNm).toBeCloseTo(355, 8);
  });
  it("I kesit bf150 tf10 tw6 h200: Wpl = 333 600, Wel = 300 160 mm³, α ≈ 1,111", () => {
    const r = celikKesitPlastikMoment.compute({ ...base, kesitTipi: "I", genislik_b_mm: 150, govdeKalinligi_tw_mm: 6, basliKalinligi_tf_mm: 10 });
    expect(r.intermediates.Wpl_mm3 as number).toBeCloseTo(333600, 6);
    expect(r.intermediates.Wel_mm3 as number).toBeCloseTo(300160, 6);
    expect(r.intermediates.sekil_faktoru_alfa as number).toBeCloseTo(333600 / 300160, 10);
  });
  it("I kesitte tw = 0 → geçersiz geometri, uygunsuz", () => {
    expect(celikKesitPlastikMoment.compute({ ...base, kesitTipi: "I" }).verdict?.status).toBe("uygunsuz");
  });
});
