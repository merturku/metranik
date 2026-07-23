import { describe, expect, it } from "vitest";
import { hidrostatikBasincTesti } from "./hidrostatik-basinc-testi";

describe("hidrostatik-basinc-testi", () => {
  // Genel sistem: gerekli = 6×1.5 = 9 bar, gerekli süre = 1 saat.
  // Uygulanan 10 bar ≥ 9, süre 2 saat ≥ 1, düşüş 0 ≤ 0 → UYGUN.
  it("genel sistemde tüm kriterler sağlandığında uygun döner", () => {
    const r = hidrostatikBasincTesti.compute({
      sistemTipi: "genel",
      calismaBasinci_bar: 6,
      uygulananTestBasinci_bar: 10,
      testSuresi_saat: 2,
      izinVerilenDusus_bar: 0,
      olculenDusus_bar: 0,
    });

    expect(r.value.gerekliTestBasinci_bar).toBeCloseTo(9, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("uygulanan test basıncı yetersizse uygunsuz döner", () => {
    const r = hidrostatikBasincTesti.compute({
      sistemTipi: "genel",
      calismaBasinci_bar: 6,
      uygulananTestBasinci_bar: 8,
      testSuresi_saat: 2,
      izinVerilenDusus_bar: 0,
      olculenDusus_bar: 0,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
    expect(r.verdict?.note).toContain("basınç");
  });

  // Sprinkler (NFPA 13): gerekli = max(13.8, 10+3.45=13.45) = 13.8 bar, gerekli süre 2 saat.
  it("sprinkler sisteminde NFPA 13 asgari 13.8 bar kuralını uygular", () => {
    const r = hidrostatikBasincTesti.compute({
      sistemTipi: "sprinkler",
      calismaBasinci_bar: 10,
      uygulananTestBasinci_bar: 14,
      testSuresi_saat: 2,
      izinVerilenDusus_bar: 0.5,
      olculenDusus_bar: 0.2,
    });

    expect(r.value.gerekliTestBasinci_bar).toBeCloseTo(13.8, 5);
    expect(r.verdict?.status).toBe("uygun");
    expect(r.standardsUsed).toEqual(["NFPA 13"]);
  });
});
