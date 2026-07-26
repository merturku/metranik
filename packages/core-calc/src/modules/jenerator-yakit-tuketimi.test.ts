import { describe, expect, it } from "vitest";
import { jeneratorYakitTuketimi } from "./jenerator-yakit-tuketimi";

describe("jenerator-yakit-tuketimi", () => {
  it("Güç=100kW, SFC=0.27 L/kWh → 27 L/h", () => {
    const r = jeneratorYakitTuketimi.compute({
      guc_kW: 100,
      ozgulYakitTuketimi_SFC_Lkwh: 0.27,
    });

    expect(r.value.yakitDebisi_Lh).toBeCloseTo(27, 5);
  });
});
