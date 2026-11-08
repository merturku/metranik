import { describe, it, expect } from "vitest";
import { kirisEgilmeDonatisiGerekli } from "./kiris-egilme-donatisi-gerekli";

const g = { tasarimMomenti_kNm: 200, genislik_b_mm: 300, faydaliYukseklik_d_mm: 550, fck_MPa: 25, fyk_MPa: 420 };

describe("Kiriş Eğilme Donatısı (Gerekli As)", () => {
  it("C25/B420C, 300×550, Md = 200 kNm → iç kuvvet kolu ≈ 0,9d ile kaba kontrol ve geri hesap Md'yi verir", () => {
    const r = kirisEgilmeDonatisiGerekli.compute(g);
    const As = r.intermediates.hesaplanan_As_mm2 as number;
    const fyd = 420 / 1.15;
    const fcd = 25 / 1.5;
    const kaba = 200e6 / (fyd * 0.9 * 550);
    expect(As).toBeGreaterThan(kaba * 0.95);
    expect(As).toBeLessThan(kaba * 1.1);
    const a = (As * fyd) / (0.85 * fcd * 300);
    expect((As * fyd * (550 - a / 2)) / 1e6).toBeCloseTo(200, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("çok küçük moment: asgari donatı esas alınır (sınırda)", () => {
    const r = kirisEgilmeDonatisiGerekli.compute({ ...g, tasarimMomenti_kNm: 10 });
    expect(r.verdict?.status).toBe("sinirda");
    expect(r.value.gerekliAs_mm2 as number).toBeCloseTo(r.intermediates.As_min_mm2 as number, 8);
  });
  it("moment kapasiteyi aşarsa null; ρ üst sınırı aşarsa uygunsuz", () => {
    const a = kirisEgilmeDonatisiGerekli.compute({ ...g, tasarimMomenti_kNm: 2000 });
    expect(a.value.gerekliAs_mm2).toBeNull();
    const b = kirisEgilmeDonatisiGerekli.compute({ ...g, tasarimMomenti_kNm: 500 });
    expect(b.verdict?.status).toBe("uygunsuz");
  });
});
