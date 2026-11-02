import { describe, it, expect } from "vitest";
import { gesInvertorGucu } from "./ges-invertor-gucu";

describe("GES İnvertör Gücü", () => {
  it("12 kWp, DC/AC 1,2 → ideal 10 kW → 10 kW; gerçek oran 1,2 → uygun", () => {
    const r = gesInvertorGucu.compute({ dcPanelGucu_kWp: 12, hedefDcAcOrani: 1.2 });
    expect(r.value.invertorGucu_kW).toBe(10);
    expect(r.intermediates.gercek_dc_ac_orani as number).toBeCloseTo(1.2, 9);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("10 kWp, 1,2 → ideal 8,33 → 10 kW (basamak); oran 1,0", () => {
    const r = gesInvertorGucu.compute({ dcPanelGucu_kWp: 10, hedefDcAcOrani: 1.2 });
    expect(r.value.invertorGucu_kW).toBe(10);
    expect(r.intermediates.gercek_dc_ac_orani as number).toBeCloseTo(1, 9);
  });
  it("basamak üstü 1000 kW sonrası yukarı yuvarlar; oran uç değerleri sınırda sınıflanır", () => {
    expect(gesInvertorGucu.compute({ dcPanelGucu_kWp: 1500, hedefDcAcOrani: 1 }).value.invertorGucu_kW).toBe(1500);
    expect(gesInvertorGucu.compute({ dcPanelGucu_kWp: 30, hedefDcAcOrani: 1.6 }).verdict?.status).toBe("sinirda");
  });
});
