import { describe, it, expect } from "vitest";
import { yanginYukuYogunlugu } from "./yangin-yuku-yogunlugu";

describe("Yangın Yükü Yoğunluğu", () => {
  it("500 kg odun (17,5) + 100 kg plastik (40) = 12 750 MJ; 50 m² → 255 MJ/m², odun eşdeğeri 14,57 kg/m²", () => {
    const r = yanginYukuYogunlugu.compute({
      malzeme1Kutlesi_kg: 500, malzeme1IsilDegeri_MJkg: 17.5, malzeme2Kutlesi_kg: 100, malzeme2IsilDegeri_MJkg: 40, zeminAlani_m2: 50,
    });
    expect(r.intermediates.toplam_enerji_MJ).toBe(12750);
    expect(r.value.yanginYuku_MJm2).toBeCloseTo(255, 9);
    expect(r.intermediates.odun_esdegeri_kgm2 as number).toBeCloseTo(14.571, 3);
    expect(r.intermediates.toplam_enerji_kWh as number).toBeCloseTo(3541.67, 2);
  });
});
