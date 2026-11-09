import { describe, it, expect } from "vitest";
import { evYatirimNpvGeriOdeme } from "./ev-yatirim-npv-geri-odeme";

const g = { yatirim_TL: 100000, yillikTasarruf_TL: 20000, iskontoOrani_yuzde: 10, omur_yil: 10 };

describe("Yatırım NPV ve İç Verim", () => {
  it("I = 100 000, S = 20 000/yıl, r = %10, n = 10: annüite 6,1446 → NPV = 22 891 ₺", () => {
    const r = evYatirimNpvGeriOdeme.compute(g);
    expect(r.value.netBugunkuDeger_TL).toBeCloseTo(22891.3, 0);
    expect(r.intermediates.basit_geri_odeme_yil).toBe(5);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("iskontolu geri ödeme = −ln(1 − I·r/S)/ln(1 + r) = 7,27 yıl; IRR %15,1 (NPV(IRR) = 0)", () => {
    const r = evYatirimNpvGeriOdeme.compute(g);
    expect(r.intermediates.iskontolu_geri_odeme_yil as number).toBeCloseTo(7.27, 1);
    const irr = (r.intermediates.ic_verim_orani_yuzde as number);
    expect(irr).toBeCloseTo(15.1, 1);
    expect(evYatirimNpvGeriOdeme.compute({ ...g, iskontoOrani_yuzde: irr }).value.netBugunkuDeger_TL).toBeCloseTo(0, 2);
  });
  it("r = 0 → NPV = S·n − I = 100 000; ömür kısa ve tasarruf yetersizse uygunsuz, IRR tanımsız", () => {
    expect(evYatirimNpvGeriOdeme.compute({ ...g, iskontoOrani_yuzde: 0 }).value.netBugunkuDeger_TL).toBeCloseTo(100000, 6);
    const k = evYatirimNpvGeriOdeme.compute({ ...g, omur_yil: 3 });
    expect(k.verdict?.status).toBe("uygunsuz");
    expect(String(k.intermediates.ic_verim_orani_yuzde)).toContain("tanımsız");
  });
});
