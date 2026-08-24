import { describe, expect, it } from "vitest";
import { yanmaHavasiIhtiyaci } from "./yanma-havasi-ihtiyaci";

describe("yanma-havasi-ihtiyaci", () => {
  it("10 Nm³/h doğalgaz, teorik oran 9.52, λ=1.15 → teorik 95.2, gerekli 109.48 Nm³/h", () => {
    const r = yanmaHavasiIhtiyaci.compute({
      yakitDebisi_Nm3h: 10,
      teorikHavaOrani_Nm3Nm3: 9.52,
      fazlaHavaKatsayisi_lambda: 1.15,
    });

    expect(r.intermediates.teorikHavaDebisi_Nm3h).toBeCloseTo(95.2, 5);
    expect(r.value.gerekliYanmaHavasi_Nm3h).toBeCloseTo(109.48, 2);
  });
});
