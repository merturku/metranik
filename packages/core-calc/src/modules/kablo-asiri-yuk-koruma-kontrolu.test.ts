import { describe, it, expect } from "vitest";
import { kabloAsiriYukKorumaKontrolu } from "./kablo-asiri-yuk-koruma-kontrolu";

describe("Kablo Aşırı Yük Koruma Koordinasyonu", () => {
  const o = { tasarimAkimi_A: 30, korumaNominalAkimi_A: 32, kabloAkimTasima_A: 36, korumaTipi: "kesici" as const };
  it("Ib 30 ≤ In 32 ≤ Iz 36, kesici I2 = 46,4 ≤ 52,2 → uygun", () => {
    const r = kabloAsiriYukKorumaKontrolu.compute(o);
    expect(r.value.I2_A).toBeCloseTo(46.4, 9);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("gG sigorta 32 A, Iz = 32 A: I2 = 51,2 > 46,4 → uygunsuz", () => {
    const r = kabloAsiriYukKorumaKontrolu.compute({ ...o, kabloAkimTasima_A: 32, korumaTipi: "sigorta" });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("In > Iz uygunsuz", () => {
    expect(kabloAsiriYukKorumaKontrolu.compute({ ...o, kabloAkimTasima_A: 30 }).verdict?.status).toBe("uygunsuz");
  });
});
