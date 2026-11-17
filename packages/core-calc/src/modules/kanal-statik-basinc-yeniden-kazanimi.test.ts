import { describe, it, expect } from "vitest";
import { kanalStatikBasincYenidenKazanimi } from "./kanal-statik-basinc-yeniden-kazanimi";

describe("Kanal Statik Basınç Yeniden Kazanımı", () => {
  it("v1 = 10, v2 = 7 m/s, ρ 1,2, R 0,75: ΔPd = 30,6 Pa; ΔPs = 22,95 Pa", () => {
    const r = kanalStatikBasincYenidenKazanimi.compute({ v1_ms: 10, v2_ms: 7, r: 0.75, yogunluk_kgm3: 1.2 });
    expect(r.intermediates.dinamik_basinc_dusumu_Pa as number).toBeCloseTo(30.6, 10);
    expect(r.value.statikKazanim_Pa).toBeCloseTo(22.95, 10);
  });
  it("v2 > v1 (daralma) → negatif; v1 = v2 → 0; R = 1 → tam geri kazanım", () => {
    expect(kanalStatikBasincYenidenKazanimi.compute({ v1_ms: 7, v2_ms: 10, r: 0.75, yogunluk_kgm3: 1.2 }).value.statikKazanim_Pa).toBeLessThan(0);
    expect(kanalStatikBasincYenidenKazanimi.compute({ v1_ms: 8, v2_ms: 8, r: 0.75, yogunluk_kgm3: 1.2 }).value.statikKazanim_Pa).toBeCloseTo(0, 10);
    expect(kanalStatikBasincYenidenKazanimi.compute({ v1_ms: 10, v2_ms: 7, r: 1, yogunluk_kgm3: 1.2 }).value.statikKazanim_Pa).toBeCloseTo(30.6, 10);
  });
});
