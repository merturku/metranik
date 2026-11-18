import { describe, it, expect } from "vitest";
import { sayacDogrulukKontrolu } from "./sayac-dogruluk-kontrolu";

describe("Sayaç Doğruluk Kontrolü", () => {
  it("100,8 / 100 kWh: +%0,8; sınıf 1 sınırının %80'i → sınırda", () => {
    const r = sayacDogrulukKontrolu.compute({ sayac_kWh: 100.8, referans_kWh: 100, sinif: "1" });
    expect(r.value.hata_pct).toBeCloseTo(0.8, 8);
    expect(r.intermediates.sinir_kullanimi as number).toBeCloseTo(0.8, 8);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("sınıf 2'de aynı hata uygun; sınıf 0,5S'te uygunsuz; negatif hata mutlak değerle", () => {
    expect(sayacDogrulukKontrolu.compute({ sayac_kWh: 100.8, referans_kWh: 100, sinif: "2" }).verdict?.status).toBe("uygun");
    expect(sayacDogrulukKontrolu.compute({ sayac_kWh: 100.8, referans_kWh: 100, sinif: "0.5" }).verdict?.status).toBe("uygunsuz");
    const n = sayacDogrulukKontrolu.compute({ sayac_kWh: 99.1, referans_kWh: 100, sinif: "1" });
    expect(n.value.hata_pct).toBeCloseTo(-0.9, 8);
    expect(n.verdict?.status).toBe("sinirda");
  });
});
