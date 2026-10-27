import { describe, it, expect } from "vitest";
import { sogutucuAkiskanAzamiSarj, sogutucuAkiskanAzamiSarjInputSchema } from "./sogutucu-akiskan-azami-sarj";

const split = { akiskan: "R32" as const, sarjMiktari_kg: 1.5, odaAlani_m2: 20, montajTipi: "duvar" as const };

describe("Yanıcı Soğutucu Akışkan Azami Şarj Miktarı", () => {
  it("R32 (LFL 0,307), duvar tipi h0 = 1,8 m, 20 m²: mmax = 2,5 × 0,307^1,25 × 1,8 × √20 = 4,599 kg", () => {
    const r = sogutucuAkiskanAzamiSarj.compute(split);
    expect(r.value.azamiSarj_kg).toBeCloseTo(4.59886, 4);
    expect(r.intermediates.m1_kg).toBeCloseTo(1.228, 6);
    expect(r.intermediates.m2_kg).toBeCloseTo(7.982, 6);
  });

  it("1,5 kg şarj için asgari oda alanı = (1,5 / (2,5 × 0,307^1,25 × 1,8))² = 2,128 m² → uygun", () => {
    const r = sogutucuAkiskanAzamiSarj.compute(split);
    expect(r.intermediates.asgari_oda_alani_m2).toBeCloseTo(2.12771, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("R290 (LFL 0,038), 0,5 kg, 20 m² duvar: mmax = 0,338 kg < 0,5 kg → uygunsuz, Amin = 43,86 m²", () => {
    const r = sogutucuAkiskanAzamiSarj.compute({ ...split, akiskan: "R290", sarjMiktari_kg: 0.5 });
    expect(r.value.azamiSarj_kg).toBeCloseTo(0.337642, 5);
    expect(r.intermediates.asgari_oda_alani_m2).toBeCloseTo(43.8587, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Zemin tipi (h0 = 0,6 m) 10 m²'de R32 için mmax = 1,084 kg; m ≤ m1 = 1,228 kg ise oda sınırı uygulanmaz → uygun", () => {
    const r = sogutucuAkiskanAzamiSarj.compute({ ...split, montajTipi: "zemin", odaAlani_m2: 10, sarjMiktari_kg: 1.2 });
    expect(r.value.azamiSarj_kg).toBeCloseTo(1.08396, 4);
    expect(r.verdict?.status).toBe("uygun");
    expect(r.verdict?.note).toContain("m1");
  });

  it("m > m2 = 26·LFL ise formül kapsamı dışı → sınırda; şema bilinmeyen akışkanı reddeder", () => {
    const r = sogutucuAkiskanAzamiSarj.compute({ ...split, sarjMiktari_kg: 8, odaAlani_m2: 100 });
    expect(r.verdict?.status).toBe("sinirda");
    expect(sogutucuAkiskanAzamiSarjInputSchema.safeParse({ ...split, akiskan: "R410A" }).success).toBe(false);
  });
});
