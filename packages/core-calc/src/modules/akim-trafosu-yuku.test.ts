import { describe, it, expect } from "vitest";
import { akimTrafosuYuku } from "./akim-trafosu-yuku";

describe("Akım Trafosu Sekonder Yük", () => {
  const o = { sekonderAkimi_A: "5" as const, kabloUzunlugu_m: 20, kabloKesiti_mm2: 2.5, roleYuku_VA: 5, ctAnmaGucu_VA: 15 };
  it("R = 0,0225·40/2,5 = 0,36 Ω → 25·0,36 = 9 VA + 5 = 14 VA ≤ 15 → uygun", () => {
    const r = akimTrafosuYuku.compute(o);
    expect(r.intermediates.kablo_direnci_ohm as number).toBeCloseTo(0.36, 9);
    expect(r.value.toplamYuk_VA).toBeCloseTo(14, 9);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("1 A sekonder aynı kabloda 25 kat daha az kablo yükü (0,36 VA)", () => {
    const r = akimTrafosuYuku.compute({ ...o, sekonderAkimi_A: "1" as const });
    expect(r.intermediates.kablo_yuku_VA as number).toBeCloseTo(0.36, 9);
  });
  it("60 m kablo → 41 VA > 15 → uygunsuz", () => {
    expect(akimTrafosuYuku.compute({ ...o, kabloUzunlugu_m: 60 }).verdict?.status).toBe("uygunsuz");
  });
});
