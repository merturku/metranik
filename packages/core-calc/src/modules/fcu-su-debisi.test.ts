import { describe, expect, it } from "vitest";
import { fcuSuDebisi } from "./fcu-su-debisi";

describe("fcu-su-debisi", () => {
  it("Q=10kW, ΔT=5°C → ~0.478 L/s", () => {
    const r = fcuSuDebisi.compute({ isilYuk_Q_kW: 10, suSicaklikFarki_dT_C: 5 });

    expect(r.value.suDebisi_Ls).toBeCloseTo(0.4778, 3);
  });
});
