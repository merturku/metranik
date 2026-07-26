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
});
