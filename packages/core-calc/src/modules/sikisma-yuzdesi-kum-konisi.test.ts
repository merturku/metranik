import { describe, it, expect } from "vitest";
import { sikismaYuzdesiKumKonisi } from "./sikisma-yuzdesi-kum-konisi";

const g = { sahaYasBirimAgirlik_kNm3: 19.5, sahaSuIcerigi_yuzde: 10, maksKuruBirimAgirlik_kNm3: 18.6, optimumSuIcerigi_yuzde: 11, gerekliSikisma_yuzde: 95 };

describe("Saha Sıkışma Yüzdesi", () => {
  it("γyaş = 19,5, w = %10 → γd = 17,727; γd,maks = 18,6 → RC = %95,3; uygun", () => {
    const r = sikismaYuzdesiKumKonisi.compute(g);
    expect(r.intermediates.saha_kuru_birim_agirlik_kNm3 as number).toBeCloseTo(17.727, 3);
    expect(r.value.sikisma_yuzde).toBeCloseTo(95.31, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("RC %94 → sınırda (gerekenin ≤ %2 altı); %91 → uygunsuz; w sapması > %2 uyarısı", () => {
    expect(sikismaYuzdesiKumKonisi.compute({ ...g, sahaYasBirimAgirlik_kNm3: 19.2 }).verdict?.status).toBe("sinirda");
    expect(sikismaYuzdesiKumKonisi.compute({ ...g, sahaYasBirimAgirlik_kNm3: 18.6 }).verdict?.status).toBe("uygunsuz");
    expect(String(sikismaYuzdesiKumKonisi.compute({ ...g, sahaSuIcerigi_yuzde: 14 }).intermediates.su_icerigi_uyarisi)).toContain("düzeltin");
  });
});
