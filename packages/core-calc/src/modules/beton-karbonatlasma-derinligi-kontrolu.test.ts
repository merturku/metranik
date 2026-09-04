import { describe, expect, it } from "vitest";
import { betonKarbonatlasmaDerinligiKontrolu } from "./beton-karbonatlasma-derinligi-kontrolu";

describe("beton-karbonatlasma-derinligi-kontrolu", () => {
  it("k=5 mm/√yıl, t=30 yıl, pas payı=30mm → d≈27.39mm → uygun", () => {
    const r = betonKarbonatlasmaDerinligiKontrolu.compute({
      karbonatlasmaKatsayisi_k_mmYilYariKuvvet: 5,
      gecenSure_t_yil: 30,
      pasPayi_mm: 30,
    });

    expect(r.value.karbonatlasmaDerinligi_d_mm).toBeCloseTo(27.386, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
});
