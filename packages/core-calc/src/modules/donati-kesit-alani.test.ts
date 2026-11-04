import { describe, it, expect } from "vitest";
import { donatiKesitAlani } from "./donati-kesit-alani";

describe("Donatı Kesit Alanı ve Adet Seçimi", () => {
  it("4Ø16 = 804,25 mm²; gerekli 1000 mm² → yetersiz, 5 adet gerekir", () => {
    const r = donatiKesitAlani.compute({ cap_mm: 16, adet: 4, gerekliAlan_mm2: 1000 });
    expect(r.value.toplamAlan_mm2).toBeCloseTo(804.25, 2);
    expect(r.intermediates.gereken_adet).toBe(5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("5Ø16 = 1005,31 mm² ≥ 1000 → uygun", () => {
    const r = donatiKesitAlani.compute({ cap_mm: 16, adet: 5, gerekliAlan_mm2: 1000 });
    expect(r.value.toplamAlan_mm2).toBeCloseTo(1005.31, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
});
