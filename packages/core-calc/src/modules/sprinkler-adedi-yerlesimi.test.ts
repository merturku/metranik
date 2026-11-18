import { describe, it, expect } from "vitest";
import { sprinklerAdediYerlesimi } from "./sprinkler-adedi-yerlesimi";

describe("Sprinkler Adedi ve Yerleşimi", () => {
  it("20×12 m, Amaks 12 m², Smaks 4,6 m: 6×4 = 24 sprinkler; aralık 3,333 × 3 m; 10 m²", () => {
    const r = sprinklerAdediYerlesimi.compute({ boy_m: 20, en_m: 12, aMaks_m2: 12, sMaks_m: 4.6 });
    expect(r.value.sprinklerAdedi).toBe(24);
    expect(r.intermediates.nx).toBe(6);
    expect(r.intermediates.ny).toBe(4);
    expect(r.intermediates.aralik_x_m as number).toBeCloseTo(3.33333, 4);
    expect(r.intermediates.sprinkler_basina_alan_m2 as number).toBeCloseTo(10, 8);
  });
  it("gevşek alan sınırında yalnız aralık sınırı belirleyici (20×12, Amaks 20: 5×3 = 15, 4×4 m = 16 m²)", () => {
    const r = sprinklerAdediYerlesimi.compute({ boy_m: 20, en_m: 12, aMaks_m2: 20, sMaks_m: 4.6 });
    expect(r.value.sprinklerAdedi).toBe(15);
    expect(r.intermediates.sprinkler_basina_alan_m2 as number).toBeCloseTo(16, 8);
  });
  it("küçük mahal tek sprinkler", () => {
    expect(sprinklerAdediYerlesimi.compute({ boy_m: 3, en_m: 3, aMaks_m2: 12, sMaks_m: 4.6 }).value.sprinklerAdedi).toBe(1);
  });
});
