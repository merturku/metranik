import { describe, expect, it } from "vitest";
import { zeminKonsolidasyonSuresi } from "./zemin-konsolidasyon-suresi";

describe("zemin-konsolidasyon-suresi", () => {
  it("Tv=0.848 (U=%90), H=5m, cv=2 m²/yıl → t=10.6 yıl", () => {
    const r = zeminKonsolidasyonSuresi.compute({
      zamanFaktoru_Tv: 0.848,
      drenajYoluUzunlugu_H_m: 5,
      konsolidasyonKatsayisi_cv_m2yil: 2,
    });

    expect(r.intermediates.drenajYoluUzunluguKaresi_H2_m2).toBeCloseTo(25, 5);
    expect(r.value.konsolidasyonSuresi_t_yil).toBeCloseTo(10.6, 3);
  });
});
