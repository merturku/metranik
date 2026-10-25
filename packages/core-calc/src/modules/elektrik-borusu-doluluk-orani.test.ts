import { describe, it, expect } from "vitest";
import { elektrikBorusuDolulukOrani, elektrikBorusuDolulukOraniInputSchema } from "./elektrik-borusu-doluluk-orani";

const boru = { boruIcCapi_D_mm: 20, kabloDisCapi_d_mm: 6, kabloSayisi: 4 };

describe("Elektrik Borusu (Konduit) Doluluk Oranı", () => {
  it("D = 20 mm, 4 × 6 mm kablo: 4×36/400 = %36 ≤ %40 → uygun; bu boruya en fazla ⌊0,4×400/36⌋ = 4 kablo", () => {
    const r = elektrikBorusuDolulukOrani.compute(boru);
    expect(r.value.dolulukOrani_yuzde).toBeCloseTo(36, 9);
    expect(r.intermediates.izin_verilen_oran_yuzde).toBe(40);
    expect(r.intermediates.bu_boruya_3_ve_uzeri_azami_kablo).toBe(4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("5 kablo: %45 > %40 → uygunsuz; en küçük iç çap 6×√(5/0,4) = 21,21 mm", () => {
    const r = elektrikBorusuDolulukOrani.compute({ ...boru, kabloSayisi: 5 });
    expect(r.value.dolulukOrani_yuzde).toBeCloseTo(45, 9);
    expect(r.intermediates.gereken_en_kucuk_ic_cap_mm).toBeCloseTo(21.2132, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("NEC sınırları kablo sayısına göre: tek 15 mm kablo %56,25 > %53; iki 8 mm kablo %32 > %31 → ikisi de uygunsuz", () => {
    const tek = elektrikBorusuDolulukOrani.compute({ ...boru, kabloDisCapi_d_mm: 15, kabloSayisi: 1 });
    expect(tek.intermediates.izin_verilen_oran_yuzde).toBe(53);
    expect(tek.verdict?.status).toBe("uygunsuz");
    const iki = elektrikBorusuDolulukOrani.compute({ ...boru, kabloDisCapi_d_mm: 8, kabloSayisi: 2 });
    expect(iki.intermediates.izin_verilen_oran_yuzde).toBe(31);
    expect(iki.value.dolulukOrani_yuzde).toBeCloseTo(32, 9);
    expect(iki.verdict?.status).toBe("uygunsuz");
  });

  it("Kablo sayısı tam sayı olmalı", () => {
    expect(elektrikBorusuDolulukOraniInputSchema.safeParse({ ...boru, kabloSayisi: 2.5 }).success).toBe(false);
  });
});
