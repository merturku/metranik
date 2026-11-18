import { describe, it, expect } from "vitest";
import { hidronikKritikDevreBasincKaybi } from "./hidronik-kritik-devre-basinc-kaybi";

describe("Hidronik Kritik Devre Basınç Kaybı", () => {
  it("R 150 Pa/m, 120 m, Σζ 12, v 1,2: 18 kPa + 8,64 kPa + 25 kPa = 51,64; %10 payla 56,804 kPa; H = 5,7924 m", () => {
    const r = hidronikKritikDevreBasincKaybi.compute({ r_Pam: 150, L_m: 120, zeta: 12, v_ms: 1.2, ekipman_kPa: 25, pay: 0.1 });
    expect(r.intermediates.surtunme_kaybi_kPa as number).toBeCloseTo(18, 10);
    expect(r.intermediates.yerel_kayip_kPa as number).toBeCloseTo(8.64, 10);
    expect(r.value.toplamKayip_kPa).toBeCloseTo(56.804, 6);
    expect(r.intermediates.pompa_yuksekligi_m as number).toBeCloseTo(5.79240, 4);
  });
  it("pay 0 → 51,64 kPa = 5,2658 m; hız iki katı → yerel kayıp 4 kat", () => {
    const a = hidronikKritikDevreBasincKaybi.compute({ r_Pam: 150, L_m: 120, zeta: 12, v_ms: 1.2, ekipman_kPa: 25, pay: 0 });
    expect(a.value.toplamKayip_kPa).toBeCloseTo(51.64, 8);
    expect(a.intermediates.pompa_yuksekligi_m as number).toBeCloseTo(5.26581, 4);
    const b = hidronikKritikDevreBasincKaybi.compute({ r_Pam: 150, L_m: 120, zeta: 12, v_ms: 2.4, ekipman_kPa: 25, pay: 0 });
    expect((b.intermediates.yerel_kayip_kPa as number) / (a.intermediates.yerel_kayip_kPa as number)).toBeCloseTo(4, 10);
  });
});
