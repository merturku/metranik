import { describe, expect, it } from "vitest";
import { betonBasincDayanimiKontrolu } from "./beton-basinc-dayanimi-kontrolu";

describe("beton-basinc-dayanimi-kontrolu", () => {
  it("ölçülen dayanım f'ck üzerindeyse uygun döner", () => {
    const r = betonBasincDayanimiKontrolu.compute({
      olculenDayanim_MPa: 28,
      karakteristikDayanim_fck_MPa: 25,
    });

    expect(r.value.marj_MPa).toBeCloseTo(3, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ölçülen dayanım f'ck altındaysa uygunsuz döner", () => {
    const r = betonBasincDayanimiKontrolu.compute({
      olculenDayanim_MPa: 22,
      karakteristikDayanim_fck_MPa: 25,
    });

    expect(r.value.marj_MPa).toBeCloseTo(-3, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
