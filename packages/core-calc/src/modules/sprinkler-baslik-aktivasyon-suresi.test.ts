import { describe, it, expect } from "vitest";
import { sprinklerBaslikAktivasyonSuresi } from "./sprinkler-baslik-aktivasyon-suresi";

const g = { rti_m05s05: 100, gazHizi_m_s: 4, gazSicakligi_C: 200, ortamSicakligi_C: 20, aktivasyonSicakligi_C: 68 };

describe("Sprinkler Aktivasyon Süresi", () => {
  it("RTI 100, u 4 → τ 50 s; t = 50·ln(180/132) = 15,51 s", () => {
    const r = sprinklerBaslikAktivasyonSuresi.compute(g);
    expect(r.intermediates.zaman_sabiti_s as number).toBeCloseTo(50, 10);
    expect(r.value.aktivasyonSuresi_s as number).toBeCloseTo(50 * Math.log(180 / 132), 10);
    expect(r.value.aktivasyonSuresi_s as number).toBeCloseTo(15.51, 2);
  });
  it("RTI iki katına çıkınca süre iki katı; hızı 4 katına çıkarmak süreyi yarıya indirir", () => {
    const a = sprinklerBaslikAktivasyonSuresi.compute(g).value.aktivasyonSuresi_s as number;
    expect(sprinklerBaslikAktivasyonSuresi.compute({ ...g, rti_m05s05: 200 }).value.aktivasyonSuresi_s as number).toBeCloseTo(2 * a, 10);
    expect(sprinklerBaslikAktivasyonSuresi.compute({ ...g, gazHizi_m_s: 16 }).value.aktivasyonSuresi_s as number).toBeCloseTo(a / 2, 10);
  });
  it("gaz sıcaklığı aktivasyon altında → null + uygunsuz", () => {
    const r = sprinklerBaslikAktivasyonSuresi.compute({ ...g, gazSicakligi_C: 60 });
    expect(r.value.aktivasyonSuresi_s).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
