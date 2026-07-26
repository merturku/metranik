import { describe, expect, it } from "vitest";
import { aydinlatmaDiregiRuzgarYuku } from "./aydinlatma-diregi-ruzgar-yuku";

describe("aydinlatma-diregi-ruzgar-yuku", () => {
  it("qp=1225Pa, Cf=1.2, A=0.5m² → 735 N", () => {
    const r = aydinlatmaDiregiRuzgarYuku.compute({
      tepeHizBasinci_qp_Pa: 1225,
      kuvvetKatsayisi_Cf: 1.2,
      etkiliYuzeyAlani_A_m2: 0.5,
    });

    expect(r.value.ruzgarKuvveti_N).toBeCloseTo(735, 5);
  });
});
