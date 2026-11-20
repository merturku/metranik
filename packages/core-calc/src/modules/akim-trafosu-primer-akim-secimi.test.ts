import { describe, it, expect } from "vitest";
import { akimTrafosuPrimerAkimSecimi } from "./akim-trafosu-primer-akim-secimi";

describe("Akım Trafosu Primer Akım Seçimi", () => {
  it("173 A × 1,2 = 207,6 → 250 A (200 yetmez); oran 250/5, yükleme %69", () => {
    const r = akimTrafosuPrimerAkimSecimi.compute({ isletmeAkimi_A: 173, tasarimPayi: 1.2, sekonderAkim_A: "5" });
    expect(r.value.primerAkim_A).toBe(250);
    expect(r.intermediates.donusum_orani).toBe("250/5");
    expect(r.intermediates.donusum_orani_sayisal as number).toBe(50);
    expect(r.intermediates.isletme_akimi_yuzdesi as number).toBeCloseTo(69.2, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("100 A × 1,2 = 120 → 125 A (12,5×10)", () => {
    expect(akimTrafosuPrimerAkimSecimi.compute({ isletmeAkimi_A: 100, tasarimPayi: 1.2, sekonderAkim_A: "1" }).value.primerAkim_A).toBe(125);
  });
  it("tam seri değerinde (150 A gerekli) 150 A seçilir; küçük yük sınırda", () => {
    expect(akimTrafosuPrimerAkimSecimi.compute({ isletmeAkimi_A: 150, tasarimPayi: 1, sekonderAkim_A: "5" }).value.primerAkim_A).toBe(150);
    expect(akimTrafosuPrimerAkimSecimi.compute({ isletmeAkimi_A: 10, tasarimPayi: 8, sekonderAkim_A: "5" }).verdict?.status).toBe("sinirda");
  });
  it("seri aşılırsa null + uygunsuz", () => {
    const r = akimTrafosuPrimerAkimSecimi.compute({ isletmeAkimi_A: 900000, tasarimPayi: 1.2, sekonderAkim_A: "5" });
    expect(r.value.primerAkim_A).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
