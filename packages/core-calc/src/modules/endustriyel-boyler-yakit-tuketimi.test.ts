import { describe, expect, it } from "vitest";
import { endustriyelBoylerYakitTuketimi } from "./endustriyel-boyler-yakit-tuketimi";

describe("endustriyel-boyler-yakit-tuketimi", () => {
  it("Q=500kW, AID=9.4 kWh/m³, η=0.9 → ~59.1 m³/h", () => {
    const r = endustriyelBoylerYakitTuketimi.compute({
      isiYuku_Q_kW: 500,
      yakitAltIsilDegeri_kWhm3: 9.4,
      kazanVerimi_eta: 0.9,
    });

    expect(r.value.yakitDebisi_m3h).toBeCloseTo(59.102, 2);
  });
});
