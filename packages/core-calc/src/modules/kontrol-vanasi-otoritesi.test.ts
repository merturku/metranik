import { describe, it, expect } from "vitest";
import { kontrolVanasiOtoritesi, kontrolVanasiOtoritesiInputSchema } from "./kontrol-vanasi-otoritesi";

const devre = { debi_m3h: 2, vanaKvs_m3h: 4, devreBasincKaybi_kPa: 25 };

describe("Kontrol Vanası Otoritesi", () => {
  it("Q = 2 m³/h, Kvs = 4: ΔPv = 100×(0,5)² = 25 kPa; devre 25 kPa → N = 0,5 → uygun; N = 0,5 için Kvs = 2/√0,25 = 4", () => {
    const r = kontrolVanasiOtoritesi.compute(devre);
    expect(r.intermediates.tam_acik_vana_kaybi_kPa).toBeCloseTo(25, 9);
    expect(r.value.vanaOtoritesi_N).toBeCloseTo(0.5, 12);
    expect(r.intermediates.otorite_05_icin_gerekli_Kvs).toBeCloseTo(4, 12);
    expect(r.intermediates.onerilen_standart_Kvs).toBe(4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Bir boy büyük vana Kvs = 6,3: ΔPv = 10,08 kPa, N = 10,08/35,08 = 0,287 → sınırda", () => {
    const r = kontrolVanasiOtoritesi.compute({ ...devre, vanaKvs_m3h: 6.3 });
    expect(r.intermediates.tam_acik_vana_kaybi_kPa).toBeCloseTo(10.0781, 4);
    expect(r.value.vanaOtoritesi_N).toBeCloseTo(0.2873, 4);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("Kvs = 16: N = 1,5625/26,5625 = 0,059 → uygunsuz; devre 40 kPa'da gereken Kvs 3,16 → standart 2,5", () => {
    expect(kontrolVanasiOtoritesi.compute({ ...devre, vanaKvs_m3h: 16 }).verdict?.status).toBe("uygunsuz");
    const r = kontrolVanasiOtoritesi.compute({ ...devre, devreBasincKaybi_kPa: 40 });
    expect(r.intermediates.otorite_05_icin_gerekli_Kvs).toBeCloseTo(3.16228, 5);
    expect(r.intermediates.onerilen_standart_Kvs).toBe(2.5);
  });

  it("Standart Kvs onlu basamak geçişi: gereken 0,9 → 0,63; gereken 12 → 10", () => {
    const kvs = (Q: number, dp: number) =>
      kontrolVanasiOtoritesi.compute({ debi_m3h: Q, vanaKvs_m3h: 1, devreBasincKaybi_kPa: dp }).intermediates.onerilen_standart_Kvs;
    expect(kvs(0.9, 100)).toBeCloseTo(0.63, 12);
    expect(kvs(12, 100)).toBe(10);
  });

  it("Debi sıfır olamaz", () => {
    expect(kontrolVanasiOtoritesiInputSchema.safeParse({ ...devre, debi_m3h: 0 }).success).toBe(false);
  });
});
