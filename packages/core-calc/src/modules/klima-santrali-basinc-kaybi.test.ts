import { describe, expect, it } from "vitest";
import { klimaSantraliBasincKaybi } from "./klima-santrali-basinc-kaybi";

describe("klima-santrali-basinc-kaybi", () => {
  it("150+100+80+30+50 → 410 Pa", () => {
    const r = klimaSantraliBasincKaybi.compute({
      filtreKaybi_Pa: 150,
      isiticiSogutucuKaybi_Pa: 100,
      kanalKaybi_Pa: 80,
      difuzorKaybi_Pa: 30,
      guvenlikMarji_Pa: 50,
    });

    expect(r.value.toplamBasincKaybi_Pa).toBeCloseTo(410, 5);
  });
});
