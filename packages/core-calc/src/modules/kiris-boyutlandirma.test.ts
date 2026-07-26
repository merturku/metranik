import { describe, expect, it } from "vitest";
import { kirisBoyutlandirma } from "./kiris-boyutlandirma";

describe("kiris-boyutlandirma", () => {
  it("TS 500: C25/B420C, As=1000mm², b=300mm, d=450mm → ~148.66 kNm", () => {
    const r = kirisBoyutlandirma.compute({
      betonKarakteristikDayanim_fck_MPa: 25,
      celikAkmaDayanimi_fyk_MPa: 420,
      donatiAlani_As_mm2: 1000,
      kirisGenisligi_b_mm: 300,
      faydaliYukseklik_d_mm: 450,
    });

    expect(r.intermediates.basincBlokuYuksekligi_a_mm).toBeCloseTo(85.934, 2);
    expect(r.value.momentKapasitesi_kNm).toBeCloseTo(148.656, 1);
  });
});
