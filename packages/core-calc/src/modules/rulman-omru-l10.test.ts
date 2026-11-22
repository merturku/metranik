import { describe, it, expect } from "vitest";
import { rulmanOmruL10 } from "./rulman-omru-l10";

describe("Rulman Nominal Ömrü L10", () => {
  const g = { dinamikYukSayisi_C_kN: 25, esdegerYuk_P_kN: 5, devir_rpm: 1450, rulmanTipi: "bilya" as const, gerekliOmur_saat: 20000 };
  it("C/P = 5 bilyalı: L10 = 125 milyon devir; 1450 rpm → 1436,78 saat; 20 000 saat için uygunsuz", () => {
    const r = rulmanOmruL10.compute(g);
    expect(r.intermediates.L10_milyon_devir as number).toBeCloseTo(125, 8);
    expect(r.value.L10h_saat).toBeCloseTo(1436.7816, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("makaralı p = 10/3: L10 = 5^(10/3) ≈ 213,75", () => {
    const r = rulmanOmruL10.compute({ ...g, rulmanTipi: "makara" });
    expect(r.intermediates.L10_milyon_devir as number).toBeCloseTo(Math.pow(5, 10 / 3), 8);
    expect(r.intermediates.L10_milyon_devir as number).toBeCloseTo(213.747, 2);
  });
  it("gereken ömür 1200 saat → uygun; 1700 saat → oran 0,845 sınırda", () => {
    expect(rulmanOmruL10.compute({ ...g, gerekliOmur_saat: 1200 }).verdict?.status).toBe("uygun");
    expect(rulmanOmruL10.compute({ ...g, gerekliOmur_saat: 1700 }).verdict?.status).toBe("sinirda");
  });
});
