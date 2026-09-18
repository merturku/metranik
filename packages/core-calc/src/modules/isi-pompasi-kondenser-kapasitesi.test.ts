import { describe, it, expect } from "vitest";
import { isiPompasıKondanserKapasitesi } from "./isi-pompasi-kondenser-kapasitesi";

describe("Isı Pompası Kondenser Kapasitesi", () => {
  it("W=10 kW, COP=3.5 → Q_cond_needed=35 kW, kondenser=40 kW → uygun", () => {
    const r = isiPompasıKondanserKapasitesi.compute({
      kompresor_gucu_kW: 10,
      isitma_cop: 3.5,
      kondenser_kapasite_kW: 40,
    });

    expect(r.value.gereken_kondenser_kapasitesi_kW).toBeCloseTo(35, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("W=15 kW, COP=4.0 → Q_cond_needed=60 kW, kondenser=50 kW → yetersiz", () => {
    const r = isiPompasıKondanserKapasitesi.compute({
      kompresor_gucu_kW: 15,
      isitma_cop: 4.0,
      kondenser_kapasite_kW: 50,
    });

    expect(r.value.gereken_kondenser_kapasitesi_kW).toBeCloseTo(60, 0);
    expect(r.value.verdict?.status).toBe("yetersiz");
  });

  it("W=5 kW, COP=2.8 → Q_cond_needed=14 kW, kondenser=15 kW → uygun", () => {
    const r = isiPompasıKondanserKapasitesi.compute({
      kompresor_gucu_kW: 5,
      isitma_cop: 2.8,
      kondenser_kapasite_kW: 15,
    });

    expect(r.value.gereken_kondenser_kapasitesi_kW).toBeCloseTo(14, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });
});
