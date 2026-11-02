import { describe, it, expect } from "vitest";
import { ikiAciklikliSurekliKiris } from "./iki-aciklikli-surekli-kiris";

describe("İki Açıklıklı Sürekli Kiriş", () => {
  it("L 6, w 10: M_B = 45, M_açıklık = 25,31 kNm, R_uç = 22,5, R_orta = 75, toplam 120 kN", () => {
    const r = ikiAciklikliSurekliKiris.compute({ aciklik_m: 6, yayiliYuk_kNm: 10 });
    expect(r.value.ortaMesnetMomenti_kNm).toBeCloseTo(45, 9);
    expect(r.intermediates.aciklik_maks_momenti_kNm as number).toBeCloseTo(25.3125, 4);
    expect(r.intermediates.uc_mesnet_reaksiyonu_kN as number).toBeCloseTo(22.5, 9);
    expect(r.intermediates.orta_mesnet_reaksiyonu_kN as number).toBeCloseTo(75, 9);
  });
  it("denge: 2·R_uç + R_orta = toplam yük", () => {
    const r = ikiAciklikliSurekliKiris.compute({ aciklik_m: 5, yayiliYuk_kNm: 18 });
    const i = r.intermediates as Record<string, number>;
    expect(2 * (i.uc_mesnet_reaksiyonu_kN as number) + (i.orta_mesnet_reaksiyonu_kN as number)).toBeCloseTo(i.toplam_yuk_kN as number, 9);
  });
});
