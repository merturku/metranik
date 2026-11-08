import { describe, it, expect } from "vitest";
import { kabloJouleKaybiYillikMaliyet } from "./kablo-joule-kaybi-yillik-maliyet";

const g = { faz: "3" as const, akim_A: 100, birimDirenc_mOhm_m: 1.15, uzunluk_m: 50, yillikSaat_h: 4000, birimFiyat_TLkWh: 3 };

describe("Kablo Joule Kaybı", () => {
  it("3 faz, 100 A, R = 0,0575 Ω: P = 3·10⁴·0,0575 = 1725 W; 4000 h → 6900 kWh; 20 700 ₺", () => {
    const r = kabloJouleKaybiYillikMaliyet.compute(g);
    expect(r.value.guc_kaybi_W).toBeCloseTo(1725, 6);
    expect(r.intermediates.yillik_enerji_kaybi_kWh as number).toBeCloseTo(6900, 4);
    expect(r.intermediates.yillik_maliyet_TL as number).toBeCloseTo(20700, 3);
  });
  it("tek faz katsayısı 2; akım iki katına çıkınca kayıp 4 katına çıkar", () => {
    const tek = kabloJouleKaybiYillikMaliyet.compute({ ...g, faz: "1" }).value.guc_kaybi_W;
    expect(tek).toBeCloseTo(1150, 6);
    expect(kabloJouleKaybiYillikMaliyet.compute({ ...g, akim_A: 200 }).value.guc_kaybi_W).toBeCloseTo(4 * 1725, 6);
  });
});
