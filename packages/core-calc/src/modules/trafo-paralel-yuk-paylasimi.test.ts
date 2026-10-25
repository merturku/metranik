import { describe, it, expect } from "vitest";
import { trafoParalelYukPaylasimi, trafoParalelYukPaylasimiInputSchema } from "./trafo-paralel-yuk-paylasimi";

const trafolar = {
  trafo1Guc_kVA: 1000,
  trafo1Uk_yuzde: 6,
  trafo2Guc_kVA: 630,
  trafo2Uk_yuzde: 4.5,
  toplamYuk_kVA: 1500,
};

describe("Trafoların Paralel Çalışma Yük Paylaşımı", () => {
  it("1000 kVA %6 + 630 kVA %4,5, 1500 kVA yük: ağırlıklar 166,67 + 140 → T1 815,2 kVA (%81,5), T2 684,8 kVA (%108,7) → uygunsuz", () => {
    const r = trafoParalelYukPaylasimi.compute(trafolar);
    expect(r.intermediates.trafo1_yuku_kVA).toBeCloseTo(815.217, 3);
    expect(r.intermediates.trafo2_yuku_kVA).toBeCloseTo(684.783, 3);
    expect(r.intermediates.trafo2_yuklenme_yuzde).toBeCloseTo(108.696, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Azami yük = min(uk) × Σ(Sr/uk) = 4,5 × 306,67 = 1380 kVA (kurulu 1630 kVA'nın %84,7'si)", () => {
    const r = trafoParalelYukPaylasimi.compute(trafolar);
    expect(r.value.azamiToplamYuk_kVA).toBeCloseTo(1380, 9);
    expect(r.intermediates.kurulu_guc_kullanim_orani_yuzde).toBeCloseTo(84.663, 3);
    const tam = trafoParalelYukPaylasimi.compute({ ...trafolar, toplamYuk_kVA: 1380 });
    expect(tam.intermediates.trafo2_yuklenme_yuzde).toBeCloseTo(100, 9);
  });

  it("Aynı uk'lu trafolarda yük anma güçleriyle orantılı paylaşılır ve kurulu gücün tamamı kullanılır", () => {
    const r = trafoParalelYukPaylasimi.compute({ ...trafolar, trafo2Uk_yuzde: 6, toplamYuk_kVA: 1630 });
    expect(r.intermediates.trafo1_yuklenme_yuzde).toBeCloseTo(100, 9);
    expect(r.intermediates.trafo2_yuklenme_yuzde).toBeCloseTo(100, 9);
    expect(r.value.azamiToplamYuk_kVA).toBeCloseTo(1630, 9);
  });

  it("İki 1000 kVA, uk %6 ve %5,5 (fark %9,1), 1500 kVA: T1 717,4, T2 782,6 kVA → uygun; uk 6 / 4,5 ve 1000 kVA yükte → sınırda", () => {
    const r = trafoParalelYukPaylasimi.compute({ ...trafolar, trafo2Guc_kVA: 1000, trafo2Uk_yuzde: 5.5 });
    expect(r.intermediates.trafo1_yuku_kVA).toBeCloseTo(717.391, 3);
    expect(r.intermediates.uk_farki_yuzde).toBeCloseTo(9.0909, 4);
    expect(r.verdict?.status).toBe("uygun");
    expect(trafoParalelYukPaylasimi.compute({ ...trafolar, toplamYuk_kVA: 1000 }).verdict?.status).toBe("sinirda");
  });

  it("uk değeri sıfır olamaz", () => {
    expect(trafoParalelYukPaylasimiInputSchema.safeParse({ ...trafolar, trafo1Uk_yuzde: 0 }).success).toBe(false);
  });
});
