import { describe, expect, it } from "vitest";
import { paratonerKorumaYaricapi } from "./paratoner-koruma-yaricapi";

describe("paratoner-koruma-yaricapi", () => {
  it("TS EN 62305: h=6m, D=60m → Rp≈26.15 m", () => {
    const r = paratonerKorumaYaricapi.compute({
      paratonerYuksekligi_h_m: 6,
      korumaSeviyesiParametresi_D_m: 60,
    });

    expect(r.value.korumaYaricapi_m).toBeCloseTo(26.153, 2);
  });
});
