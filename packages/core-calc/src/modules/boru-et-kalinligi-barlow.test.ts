import { describe, expect, it } from "vitest";
import { boruEtKalinligiBarlow } from "./boru-et-kalinligi-barlow";

describe("boru-et-kalinligi-barlow", () => {
  it("P=1.6MPa, D=114.3mm, S=100MPa → ~0.9144 mm", () => {
    const r = boruEtKalinligiBarlow.compute({
      icBasinc_P_MPa: 1.6,
      disCap_D_mm: 114.3,
      izinVerilenGerilme_S_MPa: 100,
    });

    expect(r.value.minimumEtKalinligi_mm).toBeCloseTo(0.9144, 4);
  });
});
