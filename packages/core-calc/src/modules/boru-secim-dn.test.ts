import { describe, it, expect } from "vitest";
import { boruSecimDn } from "./boru-secim-dn";

describe("Boru Seçimi (DN)", () => {
  it("20 m³/h, 1,5 m/s, t 3,6 mm → gerekli 68,67 mm; DN65 (iç 68,9) ; gerçek hız ≈ 1,490 m/s", () => {
    const r = boruSecimDn.compute({ debi_m3h: 20, tasarimHizi_ms: 1.5, etKalinligi_mm: 3.6 });
    expect(r.intermediates.gerekli_ic_cap_mm as number).toBeCloseTo(68.67, 2);
    expect(r.value.dn).toBe(65);
    expect(r.intermediates.gercek_hiz_ms as number).toBeCloseTo(1.49, 2);
  });
  it("gerekli iç çap bir DN'in iç çapını aşarsa bir üst DN seçilir", () => {
    expect(boruSecimDn.compute({ debi_m3h: 20, tasarimHizi_ms: 1.5, etKalinligi_mm: 4.0 }).value.dn).toBe(80);
  });
  it("çok büyük debide null + uygunsuz", () => {
    const r = boruSecimDn.compute({ debi_m3h: 5000, tasarimHizi_ms: 1.5, etKalinligi_mm: 5 });
    expect(r.value.dn).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
