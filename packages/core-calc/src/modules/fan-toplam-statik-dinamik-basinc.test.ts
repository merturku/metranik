import { describe, it, expect } from "vitest";
import { fanToplamStatikDinamikBasinc } from "./fan-toplam-statik-dinamik-basinc";

describe("Fan Toplam/Statik/Dinamik Basınç", () => {
  it("Ps = 500 Pa, Q = 2 m³/s, A = 0,5 m², ρ = 1,2: V = 4 m/s, Pv = 9,6 Pa, Pt = 509,6 Pa", () => {
    const r = fanToplamStatikDinamikBasinc.compute({ statikBasinc_Pa: 500, debi_m3s: 2, cikisAlani_m2: 0.5, havaYogunlugu_kgm3: 1.2 });
    expect(r.intermediates.cikis_hizi_ms).toBe(4);
    expect(r.intermediates.dinamik_basinc_Pa as number).toBeCloseTo(9.6, 8);
    expect(r.value.toplamBasinc_Pa).toBeCloseTo(509.6, 8);
    expect(r.intermediates.hava_gucu_toplam_W as number).toBeCloseTo(1019.2, 6);
  });
  it("çıkış alanı yarıya inerse dinamik basınç 4 katına çıkar", () => {
    const a = fanToplamStatikDinamikBasinc.compute({ statikBasinc_Pa: 500, debi_m3s: 2, cikisAlani_m2: 0.5, havaYogunlugu_kgm3: 1.2 }).intermediates.dinamik_basinc_Pa as number;
    const b = fanToplamStatikDinamikBasinc.compute({ statikBasinc_Pa: 500, debi_m3s: 2, cikisAlani_m2: 0.25, havaYogunlugu_kgm3: 1.2 }).intermediates.dinamik_basinc_Pa as number;
    expect(b).toBeCloseTo(4 * a, 8);
  });
});
