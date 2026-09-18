import { describe, it, expect } from "vitest";
import { boruHavaHiziKontrolu } from "./boru-hava-hizi-kontrolu";

describe("Boru Hava Hızı Kontrolü", () => {
  it("ISO 4414: Q=0.002 m³/s, D=20 mm → V≈6.37 m/s, yüksek", () => {
    const r = boruHavaHiziKontrolu.compute({
      volumetrik_debi_m3s: 0.002,
      boru_çapı_mm: 20,
      hız_alt_sınır_ms: 2,
      hız_üst_sınır_ms: 6,
    });

    expect(r.value.hava_hızı_ms).toBeCloseTo(6.37, 1);
    expect(r.value.verdict?.status).toBe("yüksek");
  });

  it("Kabul edilebilir: Q=0.001 m³/s, D=20 mm → V≈3.18 m/s, uygun", () => {
    const r = boruHavaHiziKontrolu.compute({
      volumetrik_debi_m3s: 0.001,
      boru_çapı_mm: 20,
      hız_alt_sınır_ms: 2,
      hız_üst_sınır_ms: 6,
    });

    expect(r.value.hava_hızı_ms).toBeCloseTo(3.18, 1);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("Düşük hız: Q=0.0003 m³/s, D=20 mm → V≈0.95 m/s, düşük", () => {
    const r = boruHavaHiziKontrolu.compute({
      volumetrik_debi_m3s: 0.0003,
      boru_çapı_mm: 20,
      hız_alt_sınır_ms: 2,
      hız_üst_sınır_ms: 6,
    });

    expect(r.value.hava_hızı_ms).toBeCloseTo(0.95, 1);
    expect(r.value.verdict?.status).toBe("düşük");
  });
});
