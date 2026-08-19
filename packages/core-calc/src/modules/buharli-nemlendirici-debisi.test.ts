import { describe, expect, it } from "vitest";
import { buharliNemlendiriciDebisi } from "./buharli-nemlendirici-debisi";

describe("buharli-nemlendirici-debisi", () => {
  it("hava=5000kg/h, w1=0.004, w2=0.008 → 20 kg/h buhar", () => {
    const r = buharliNemlendiriciDebisi.compute({
      havaKutleselDebisi_m_kgh: 5000,
      girisNemOrani_w1_kgkg: 0.004,
      hedefNemOrani_w2_kgkg: 0.008,
    });

    expect(r.intermediates.nemFarki_kgkg).toBeCloseTo(0.004, 5);
    expect(r.value.buharDebisi_kgh).toBeCloseTo(20, 5);
  });
});
