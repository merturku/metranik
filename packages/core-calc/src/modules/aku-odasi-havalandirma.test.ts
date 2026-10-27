import { describe, it, expect } from "vitest";
import { akuOdasiHavalandirma, akuOdasiHavalandirmaInputSchema } from "./aku-odasi-havalandirma";

const ups = { hucreSayisi: 24, kapasite_Crt_Ah: 200, akuTipi: "vrla" as const, sarjModu: "hizli" as const };

describe("Akü Odası Havalandırma Debisi (Hidrojen)", () => {
  it("VRLA hızlı şarj: Igas = 8 × 0,2 × 5 = 8 mA/Ah; Q = 0,05 × 24 × 8 × 200 × 10⁻³ = 1,92 m³/h", () => {
    const r = akuOdasiHavalandirma.compute(ups);
    expect(r.intermediates.gazlasma_akimi_Igas_mA_Ah).toBeCloseTo(8, 10);
    expect(r.value.havaDebisi_m3h).toBeCloseTo(1.92, 10);
  });

  it("Doğal havalandırma açıklığı A = 28 × Q = 53,76 cm² (giriş ve çıkış için ayrı ayrı)", () => {
    const r = akuOdasiHavalandirma.compute(ups);
    expect(r.intermediates.dogal_havalandirma_acikligi_cm2).toBeCloseTo(53.76, 10);
  });

  it("Açık (sulu) kurşun-asit, 110 hücre 100 Ah: hızlı şarj Igas = 4 × 1 × 5 = 20 → Q = 11 m³/h, A = 308 cm²", () => {
    const r = akuOdasiHavalandirma.compute({ hucreSayisi: 110, kapasite_Crt_Ah: 100, akuTipi: "acik", sarjModu: "hizli" });
    expect(r.value.havaDebisi_m3h).toBeCloseTo(11, 10);
    expect(r.intermediates.dogal_havalandirma_acikligi_cm2).toBeCloseTo(308, 10);
  });

  it("Aynı akü tampon (float) şarjda Igas = 1 × 1 × 5 = 5 → Q = 2,75 m³/h (hızlı şarjın 1/4'ü)", () => {
    const r = akuOdasiHavalandirma.compute({ hucreSayisi: 110, kapasite_Crt_Ah: 100, akuTipi: "acik", sarjModu: "tampon" });
    expect(r.value.havaDebisi_m3h).toBeCloseTo(2.75, 10);
    expect(akuOdasiHavalandirmaInputSchema.safeParse({ ...ups, hucreSayisi: 0 }).success).toBe(false);
  });
});
