import { describe, it, expect } from "vitest";
import { betonHedefOrtalamaDayanim } from "./beton-hedef-ortalama-dayanim";

describe("Beton Hedef Ortalama Dayanımı", () => {
  it("f'c 30, s 3: Denk.1 = 34,02; Denk.2 = 33,49 → 34,02 MPa; s 4: 35,36 / 35,82 → 35,82", () => {
    const a = betonHedefOrtalamaDayanim.compute({ fc_MPa: 30, veri: "var", s_MPa: 3 });
    expect(a.value.hedefDayanim_MPa).toBeCloseTo(34.02, 8);
    expect(a.intermediates.denklem_2_MPa as number).toBeCloseTo(33.49, 8);
    expect(betonHedefOrtalamaDayanim.compute({ fc_MPa: 30, veri: "var", s_MPa: 4 }).value.hedefDayanim_MPa).toBeCloseTo(35.82, 8);
  });
  it("f'c > 35: 0,9f'c + 2,33s (f'c 40, s 4 → 45,32 vs 45,36 → 45,36)", () => {
    expect(betonHedefOrtalamaDayanim.compute({ fc_MPa: 40, veri: "var", s_MPa: 4 }).value.hedefDayanim_MPa).toBeCloseTo(45.36, 8);
  });
  it("veri yok: 15 → 22; 30 → 38,5; 40 → 49", () => {
    expect(betonHedefOrtalamaDayanim.compute({ fc_MPa: 15, veri: "yok", s_MPa: 0 }).value.hedefDayanim_MPa).toBeCloseTo(22, 8);
    expect(betonHedefOrtalamaDayanim.compute({ fc_MPa: 30, veri: "yok", s_MPa: 0 }).value.hedefDayanim_MPa).toBeCloseTo(38.5, 8);
    expect(betonHedefOrtalamaDayanim.compute({ fc_MPa: 40, veri: "yok", s_MPa: 0 }).value.hedefDayanim_MPa).toBeCloseTo(49, 8);
  });
});
