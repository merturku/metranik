import { describe, expect, it } from "vitest";
import { motorGirisGucu } from "./motor-giris-gucu";

describe("motor-giris-gucu", () => {
  it("V=400V, I=50A, cosφ=0.85 → ~29.445 kW", () => {
    const r = motorGirisGucu.compute({
      hatGerilimi_V_V: 400,
      hatAkimi_I_A: 50,
      gucFaktoru_cosfi: 0.85,
    });

    expect(r.value.girisGucu_kW).toBeCloseTo(29.445, 2);
  });
});
