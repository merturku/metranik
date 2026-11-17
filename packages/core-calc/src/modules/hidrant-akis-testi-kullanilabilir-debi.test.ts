import { describe, it, expect } from "vitest";
import { hidrantAkisTestiKullanilabilirDebi } from "./hidrant-akis-testi-kullanilabilir-debi";

describe("Hidrant Akış Testi", () => {
  it("Ps 5, PF 4, QF 3000 L/dk, PR 1,4: oran 3,6; QR = 3000·3,6^0,54 = 5991,3 L/dk", () => {
    const r = hidrantAkisTestiKullanilabilirDebi.compute({ statikBasinc_bar: 5, kalanBasinc_bar: 4, testDebisi_Lmin: 3000, hedefKalanBasinc_bar: 1.4, gerekliDebi_Lmin: 4000 });
    expect(r.value.kullanilabilirDebi_Lmin).toBeCloseTo(5991.35, 1);
    expect(r.intermediates.basinc_dusum_orani as number).toBeCloseTo(3.6, 10);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("PR = PF iken QR = QF; gerekli debi büyükse uygunsuz", () => {
    const r = hidrantAkisTestiKullanilabilirDebi.compute({ statikBasinc_bar: 5, kalanBasinc_bar: 4, testDebisi_Lmin: 3000, hedefKalanBasinc_bar: 4, gerekliDebi_Lmin: 6000 });
    expect(r.value.kullanilabilirDebi_Lmin).toBeCloseTo(3000, 8);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("Zod: PF ≥ Ps reddedilir", () => {
    const g = { statikBasinc_bar: 5, kalanBasinc_bar: 5, testDebisi_Lmin: 3000, hedefKalanBasinc_bar: 1.4, gerekliDebi_Lmin: 4000 };
    expect(hidrantAkisTestiKullanilabilirDebi.inputSchema.safeParse(g).success).toBe(false);
  });
});
