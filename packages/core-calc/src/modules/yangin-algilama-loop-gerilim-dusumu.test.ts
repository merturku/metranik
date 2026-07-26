import { describe, expect, it } from "vitest";
import { yanginAlgilamaLoopGerilimDusumu } from "./yangin-algilama-loop-gerilim-dusumu";

describe("yangin-algilama-loop-gerilim-dusumu", () => {
  it("EN 54: 24V kaynak, 500m hat, 0.05A, 1.5mm² → ~23.42V, uygun (min 17V)", () => {
    const r = yanginAlgilamaLoopGerilimDusumu.compute({
      kaynakGerilimi_V: 24,
      hatUzunlugu_m: 500,
      akim_A: 0.05,
      kesit_mm2: 1.5,
      minimumUcElemanGerilimi_V: 17,
    });

    expect(r.intermediates.gerilimDusumu_V).toBeCloseTo(0.5833, 3);
    expect(r.value.ucElemanGerilimi_V).toBeCloseTo(23.4167, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("çok uzun hat/yüksek akımda uç eleman gerilimi asgarinin altına düşer", () => {
    const r = yanginAlgilamaLoopGerilimDusumu.compute({
      kaynakGerilimi_V: 24,
      hatUzunlugu_m: 3000,
      akim_A: 0.3,
      kesit_mm2: 1.5,
      minimumUcElemanGerilimi_V: 17,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
