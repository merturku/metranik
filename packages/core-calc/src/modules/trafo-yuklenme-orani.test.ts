import { describe, expect, it } from "vitest";
import { trafoYuklenmeOrani } from "./trafo-yuklenme-orani";

describe("trafoYuklenmeOrani", () => {
  it("Syük=650 kVA, Sn=800 kVA → %81.25, sınırda", () => {
    const r = trafoYuklenmeOrani.compute({ yukGucu_S_kVA: 650, nominalGuc_Sn_kVA: 800 });
    expect(r.value.yuklenmeOrani_yuzde).toBeCloseTo(81.25, 2);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("Syük, Sn'yi aşarsa uygunsuz döner", () => {
    const r = trafoYuklenmeOrani.compute({ yukGucu_S_kVA: 900, nominalGuc_Sn_kVA: 800 });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
