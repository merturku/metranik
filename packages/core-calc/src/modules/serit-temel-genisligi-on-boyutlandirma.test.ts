import { describe, expect, it } from "vitest";
import { seritTemelGenisligiOnBoyutlandirma } from "./serit-temel-genisligi-on-boyutlandirma";

describe("serit-temel-genisligi-on-boyutlandirma", () => {
  it("N=150 kN/m, qemniyet=150 kN/m² → B=1.0 m", () => {
    const r = seritTemelGenisligiOnBoyutlandirma.compute({
      birimUzunlukYuku_N_kNm: 150,
      zeminEmniyetGerilmesi_qEmniyet_kNm2: 150,
    });

    expect(r.value.gerekliGenislik_B_m).toBeCloseTo(1.0, 5);
  });
});
