import { describe, it, expect } from "vitest";
import { kazikGrubuKazikSayisi } from "./kazik-grubu-kazik-sayisi";

describe("Kazık Sayısı ve Başlık", () => {
  it("N 3000 + %10 = 3300 kN, Q_izin 800 → 4,125 → 5 kazık; 2 sıra × 3 sütun; D 0,6 → s 1,8, B 4,8 × L 3,0", () => {
    const r = kazikGrubuKazikSayisi.compute({ tasarimYuku_kN: 3000, temelAgirlikPayiYuzde: 10, kazikIzinYuku_kN: 800, kazikCapi_m: 0.6 });
    expect(r.value.kazikSayisi).toBe(5);
    expect(r.intermediates.yerlesim).toBe("2 sıra × 3 sütun");
    expect(r.intermediates.baslik_genisligi_m as number).toBeCloseTo(4.8, 9);
    expect(r.intermediates.baslik_uzunlugu_m as number).toBeCloseTo(3.0, 9);
    expect(r.intermediates.kazik_basina_yuk_kN as number).toBeCloseTo(660, 9);
  });
  it("tam kat: 3200/800 = 4 kazık (tavanlanmaz), 2×2", () => {
    const r = kazikGrubuKazikSayisi.compute({ tasarimYuku_kN: 3200, temelAgirlikPayiYuzde: 0, kazikIzinYuku_kN: 800, kazikCapi_m: 0.6 });
    expect(r.value.kazikSayisi).toBe(4);
    expect(r.intermediates.yerlesim).toBe("2 sıra × 2 sütun");
  });
});
