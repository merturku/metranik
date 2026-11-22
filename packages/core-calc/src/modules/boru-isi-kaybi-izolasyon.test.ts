import { describe, expect, it } from "vitest";
import { boruIsiKaybiIzolasyon } from "./boru-isi-kaybi-izolasyon";

describe("boru-isi-kaybi-izolasyon", () => {
  it("k=0.04, r1=30mm, r2=60mm, T1=80°C, T2=20°C, L=10m → ~217.55 W", () => {
    const r = boruIsiKaybiIzolasyon.compute({
      izolasyonIsiIletkenligi_k_WmK: 0.04,
      boruDisYaricapi_r1_mm: 30,
      izolasyonDisYaricapi_r2_mm: 60,
      icSicaklik_T1_C: 80,
      disSicaklik_T2_C: 20,
      boruUzunlugu_L_m: 10,
    });

    expect(r.intermediates.birimUzunlukKaybi_Wm).toBeCloseTo(21.755, 2);
    expect(r.value.toplamIsiKaybi_W).toBeCloseTo(217.55, 1);
  });

  it("r2 ≤ r1 girdisi reddedilir (ln(r2/r1) ≤ 0 → sonsuz/negatif kayıp üretmez)", () => {
    const g = { izolasyonIsiIletkenligi_k_WmK: 0.04, boruDisYaricapi_r1_mm: 50, izolasyonDisYaricapi_r2_mm: 50, icSicaklik_T1_C: 80, disSicaklik_T2_C: 20, boruUzunlugu_L_m: 10 };
    expect(boruIsiKaybiIzolasyon.inputSchema.safeParse(g).success).toBe(false);
    expect(boruIsiKaybiIzolasyon.inputSchema.safeParse({ ...g, izolasyonDisYaricapi_r2_mm: 40 }).success).toBe(false);
    expect(boruIsiKaybiIzolasyon.inputSchema.safeParse({ ...g, izolasyonDisYaricapi_r2_mm: 80 }).success).toBe(true);
  });
});
