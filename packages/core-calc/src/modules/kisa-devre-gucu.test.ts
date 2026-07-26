import { describe, expect, it } from "vitest";
import { kisaDevreGucu } from "./kisa-devre-gucu";

describe("kisa-devre-gucu", () => {
  it("V=400V, I=10000A → ~6928.2 kVA", () => {
    const r = kisaDevreGucu.compute({ hatGerilimi_V_V: 400, kisaDevreAkimi_I_A: 10000 });

    expect(r.value.kisaDevreGucu_kVA).toBeCloseTo(6928.2, 1);
  });
});
