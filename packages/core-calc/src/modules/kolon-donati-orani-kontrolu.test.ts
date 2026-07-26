import { describe, expect, it } from "vitest";
import { kolonDonatiOraniKontrolu } from "./kolon-donati-orani-kontrolu";

describe("kolonDonatiOraniKontrolu", () => {
  it("As=2400mm², Ac=160000mm² → ρ=0.015, uygun", () => {
    const r = kolonDonatiOraniKontrolu.compute({
      boyunaDonatiAlani_As_mm2: 2400,
      brutBetonKesitAlani_Ac_mm2: 160000,
    });
    expect(r.value.donatiOrani_ro).toBeCloseTo(0.015, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ρmin=0.01'in altındaysa uygunsuz döner", () => {
    const r = kolonDonatiOraniKontrolu.compute({
      boyunaDonatiAlani_As_mm2: 1000,
      brutBetonKesitAlani_Ac_mm2: 160000,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("ρmax=0.04'ün üstündeyse uygunsuz döner", () => {
    const r = kolonDonatiOraniKontrolu.compute({
      boyunaDonatiAlani_As_mm2: 8000,
      brutBetonKesitAlani_Ac_mm2: 160000,
    });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
