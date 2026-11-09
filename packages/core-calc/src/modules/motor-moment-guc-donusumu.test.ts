import { describe, it, expect } from "vitest";
import { motorMomentGucDonusumu } from "./motor-moment-guc-donusumu";

describe("Mil Gücü – Moment – Devir", () => {
  it("T = 95,5 Nm, n = 1500 dev/dk → P = 15,0 kW", () => {
    const r = motorMomentGucDonusumu.compute({ hedef: "guc", guc_kW: 0, moment_Nm: 95.493, devir_rpm: 1500 });
    expect(r.value.sonuc as number).toBeCloseTo(15, 3);
  });
  it("P = 15 kW, n = 1500 → T = 95,49 Nm; P = 15 kW, T = 95,49 → n = 1500", () => {
    expect(motorMomentGucDonusumu.compute({ hedef: "moment", guc_kW: 15, moment_Nm: 0, devir_rpm: 1500 }).value.sonuc as number).toBeCloseTo(95.493, 2);
    expect(motorMomentGucDonusumu.compute({ hedef: "devir", guc_kW: 15, moment_Nm: 95.493, devir_rpm: 0 }).value.sonuc as number).toBeCloseTo(1500, 1);
  });
  it("eksik girdi → null + uygunsuz", () => {
    const r = motorMomentGucDonusumu.compute({ hedef: "guc", guc_kW: 0, moment_Nm: 0, devir_rpm: 1500 });
    expect(r.value.sonuc).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
