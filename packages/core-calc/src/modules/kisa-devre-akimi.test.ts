import { describe, expect, it } from "vitest";
import { kisaDevreAkimi } from "./kisa-devre-akimi";

describe("kisa-devre-akimi", () => {
  // In = 1.000.000/(√3×400) = 1443.38 A; Isc = In×(100/6) = 24056.3 A ≈ 24.06 kA,
  // bağımsız doğrulanabilir (basitleştirilmiş empedans yöntemi).
  it("1000 kVA trafo, 400 V, %6 empedans için kısa devre akımını hesaplar", () => {
    const r = kisaDevreAkimi.compute({
      transformatorGucu_kVA: 1000,
      gerilim_V: 400,
      empedansYuzdesi: 6,
    });

    expect(r.value.kisaDevreAkimi_kA).toBeCloseTo(24.06, 1);
  });
});
