import { describe, it, expect } from "vitest";
import { hissedilenSicaklik, hissedilenSicaklikInputSchema } from "./hissedilen-sicaklik";

const fToC = (f: number) => ((f - 32) * 5) / 9;
const hiF = (tF: number, rh: number) =>
  (hissedilenSicaklik.compute({ havaSicakligi_C: fToC(tF), bagilNem_yuzde: rh, ruzgarHizi_kmh: 0 }).value
    .hissedilenSicaklik_C *
    9) /
    5 +
  32;

describe("Hissedilen Sıcaklık (Isı İndeksi / Rüzgar Soğuğu)", () => {
  it("NWS ısı indeksi tablosu (tam sayı °F): 90 °F/%60 → 100; 96 °F/%65 → 121; 100 °F/%40 → 109; 86 °F/%90 → 105 (yüksek nem düzeltmesi)", () => {
    expect(Math.abs(hiF(90, 60) - 100)).toBeLessThan(0.5);
    expect(Math.abs(hiF(96, 65) - 121)).toBeLessThan(0.5);
    expect(Math.abs(hiF(100, 40) - 109)).toBeLessThan(0.5);
    expect(Math.abs(hiF(86, 90) - 105)).toBeLessThan(0.5);
  });

  it("Isı riski: 90 °F/%60 aşırı dikkat → sınırda; 100 °F/%40 tehlike → uygunsuz", () => {
    const orta = hissedilenSicaklik.compute({ havaSicakligi_C: fToC(90), bagilNem_yuzde: 60, ruzgarHizi_kmh: 0 });
    expect(orta.verdict?.status).toBe("sinirda");
    const tehlike = hissedilenSicaklik.compute({ havaSicakligi_C: fToC(100), bagilNem_yuzde: 40, ruzgarHizi_kmh: 0 });
    expect(tehlike.verdict?.status).toBe("uygunsuz");
  });

  it("Environment Canada rüzgar soğuğu tablosu: −10 °C/20 km/h → −18; −20 °C/30 km/h → −33; −30 °C/50 km/h → −49", () => {
    const wc = (T: number, V: number) => hissedilenSicaklik.compute({ havaSicakligi_C: T, bagilNem_yuzde: 50, ruzgarHizi_kmh: V });
    const a = wc(-10, 20);
    expect(a.value.hissedilenSicaklik_C).toBeCloseTo(-17.861, 3);
    expect(Math.round(a.value.hissedilenSicaklik_C)).toBe(-18);
    expect(a.verdict?.status).toBe("sinirda");
    expect(Math.round(wc(-20, 30).value.hissedilenSicaklik_C)).toBe(-33);
    const c = wc(-30, 50);
    expect(Math.round(c.value.hissedilenSicaklik_C)).toBe(-49);
    expect(c.verdict?.status).toBe("uygunsuz");
  });

  it("Ilıman koşul (20 °C) veya rüzgarsız soğuk: düzeltme yok, hissedilen = hava sıcaklığı", () => {
    expect(hissedilenSicaklik.compute({ havaSicakligi_C: 20, bagilNem_yuzde: 50, ruzgarHizi_kmh: 15 }).value.hissedilenSicaklik_C).toBe(20);
    expect(hissedilenSicaklik.compute({ havaSicakligi_C: -5, bagilNem_yuzde: 50, ruzgarHizi_kmh: 3 }).value.hissedilenSicaklik_C).toBe(-5);
  });

  it("Bağıl nem %100'ü aşamaz", () => {
    expect(hissedilenSicaklikInputSchema.safeParse({ havaSicakligi_C: 30, bagilNem_yuzde: 110, ruzgarHizi_kmh: 0 }).success).toBe(false);
  });
});
