import { describe, it, expect } from "vitest";
import { kaldirmaSapaniKolYuku, kaldirmaSapaniKolYukuInputSchema } from "./kaldirma-sapani-kol-yuku";

const ikiKol = {
  yukAgirligi_t: 5,
  kolSayisi: "2" as const,
  kolAcisi_derece: 30,
  tekKolCalismaYuku_WLL_t: 4,
};

describe("Kaldırma Sapanı Kol Yükü ve WLL Kontrolü", () => {
  it("5 t, 2 kol, β = 30°: T = 5/(2×cos30°) = 2,887 t; takım WLL = 1,4 × 4 = 5,6 t → uygun", () => {
    const r = kaldirmaSapaniKolYuku.compute(ikiKol);
    expect(r.value.kolKuvveti_t).toBeCloseTo(2.88675, 5);
    expect(r.intermediates.kol_kuvveti_kN).toBeCloseTo(2.88675 * 9.80665, 3);
    expect(r.intermediates.sapan_takimi_WLL_t).toBeCloseTo(5.6, 12);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Aynı sapan β = 50°: T = 5/(2×cos50°) = 3,889 t; katsayı 1,0 → WLL = 4 t < 5 t → uygunsuz", () => {
    const r = kaldirmaSapaniKolYuku.compute({ ...ikiKol, kolAcisi_derece: 50 });
    expect(r.value.kolKuvveti_t).toBeCloseTo(3.88931, 5);
    expect(r.intermediates.takim_katsayisi_M).toBe(1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("4 kollu, β = 45°, tek kol WLL 2 t: takım WLL = 2,1 × 2 = 4,2 t; 4 t yükte 3 taşıyan kolla T = 4/(3×cos45°) = 1,886 t → uygun", () => {
    const r = kaldirmaSapaniKolYuku.compute({ yukAgirligi_t: 4, kolSayisi: "4", kolAcisi_derece: 45, tekKolCalismaYuku_WLL_t: 2 });
    expect(r.intermediates.yuku_tasiyan_kol_sayisi).toBe(3);
    expect(r.intermediates.sapan_takimi_WLL_t).toBeCloseTo(4.2, 12);
    expect(r.value.kolKuvveti_t).toBeCloseTo(1.88562, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("β = 65° kullanılmaz → uygunsuz; tek kol sapanda açı yok sayılır (T = W)", () => {
    expect(kaldirmaSapaniKolYuku.compute({ ...ikiKol, kolAcisi_derece: 65 }).verdict?.status).toBe("uygunsuz");
    const tek = kaldirmaSapaniKolYuku.compute({ ...ikiKol, kolSayisi: "1", kolAcisi_derece: 30, yukAgirligi_t: 3 });
    expect(tek.value.kolKuvveti_t).toBe(3);
    expect(tek.verdict?.status).toBe("uygun");
  });

  it("Bilinmeyen kol sayısı reddedilir", () => {
    expect(kaldirmaSapaniKolYukuInputSchema.safeParse({ ...ikiKol, kolSayisi: "5" }).success).toBe(false);
  });
});
