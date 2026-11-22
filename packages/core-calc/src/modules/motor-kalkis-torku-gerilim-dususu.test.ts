import { describe, it, expect } from "vitest";
import { motorKalkisTorkuGerilimDususu } from "./motor-kalkis-torku-gerilim-dususu";

describe("Motor Kalkış Momenti (Gerilim Düşümünde)", () => {
  const g = { anmaGucu_kW: 22, anmaDevri_rpm: 1470, kalkisMomentiOrani_TLR_Tn: 2, yukMomentiOrani_Tyuk_Tn: 1, anmaGerilimi_V: 400, kalkistaTerminalGerilimi_V: 340 };
  it("Tn = 142,91 Nm; V/Vn = 0,85 → Tk = 2·0,7225·Tn = 206,51 Nm; oran 1,445 uygun", () => {
    const r = motorKalkisTorkuGerilimDususu.compute(g);
    expect(r.intermediates.anma_momenti_Nm as number).toBeCloseTo(142.9147, 3);
    expect(r.value.kalkisMomenti_Nm).toBeCloseTo(206.5117, 3);
    expect(r.intermediates.kalkis_yuk_orani as number).toBeCloseTo(1.445, 8);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("300 V → oran 1,125 sınırda; 260 V → 0,845 uygunsuz; gereken min gerilim 316,2 V", () => {
    expect(motorKalkisTorkuGerilimDususu.compute({ ...g, kalkistaTerminalGerilimi_V: 300 }).verdict?.status).toBe("sinirda");
    expect(motorKalkisTorkuGerilimDususu.compute({ ...g, kalkistaTerminalGerilimi_V: 260 }).verdict?.status).toBe("uygunsuz");
    expect(motorKalkisTorkuGerilimDususu.compute(g).intermediates.gereken_min_terminal_gerilimi_V as number).toBeCloseTo(316.2278, 3);
  });
});
