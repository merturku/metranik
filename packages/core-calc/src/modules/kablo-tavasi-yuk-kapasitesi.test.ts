import { describe, it, expect } from "vitest";
import { kabloTavasiYukKapasitesi } from "./kablo-tavasi-yuk-kapasitesi";

describe("Kablo Tavası Yük Kapasitesi", () => {
  const g = {
    adet1: 20, kutle1_kgm: 1.2,
    adet2: 10, kutle2_kgm: 0.8,
    adet3: 4, kutle3_kgm: 2.5,
    ekYukPayi: 0,
    acikligi_m: 2,
    tavaGuvenliYuk_kgm: 60,
  };
  it("20×1,2 + 10×0,8 + 4×2,5 = 42 kg/m; SWL 60 → oran 0,70 uygun", () => {
    const r = kabloTavasiYukKapasitesi.compute(g);
    expect(r.value.toplamYuk_kgm).toBeCloseTo(42, 10);
    expect(r.intermediates.kullanim_orani as number).toBeCloseTo(0.7, 10);
    expect(r.intermediates.toplam_yuk_kNm as number).toBeCloseTo(0.41188, 4);
    expect(r.intermediates.mesnet_reaksiyonu_kg as number).toBeCloseTo(42, 10);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("ek yük payı %50 → 63 kg/m > 60 → uygunsuz", () => {
    const r = kabloTavasiYukKapasitesi.compute({ ...g, ekYukPayi: 0.5 });
    expect(r.value.toplamYuk_kgm).toBeCloseTo(63, 10);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("oran 0,9–1,0 arası sınırda", () => {
    expect(kabloTavasiYukKapasitesi.compute({ ...g, tavaGuvenliYuk_kgm: 44 }).verdict?.status).toBe("sinirda");
  });
});
