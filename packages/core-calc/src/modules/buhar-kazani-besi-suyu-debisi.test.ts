import { describe, expect, it } from "vitest";
import { buharKazaniBesiSuyuDebisi } from "./buhar-kazani-besi-suyu-debisi";

describe("buhar-kazani-besi-suyu-debisi", () => {
  it("buhar 1000 kg/h, blöf %5 → besi suyu 1052.63 kg/h, blöf 52.63 kg/h", () => {
    const r = buharKazaniBesiSuyuDebisi.compute({
      buharDebisi_kgh: 1000,
      blofOrani_b: 0.05,
    });

    expect(r.value.besiSuyuDebisi_kgh).toBeCloseTo(1052.63, 1);
    expect(r.intermediates.blofMiktari_kgh).toBeCloseTo(52.63, 1);
  });
});
