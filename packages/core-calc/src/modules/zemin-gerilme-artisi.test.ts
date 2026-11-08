import { describe, it, expect } from "vitest";
import { zeminGerilmeArtisi } from "./zemin-gerilme-artisi";

const t = { yuk_kN: 1000, genislik_B_m: 2, uzunluk_L_m: 2, derinlik_z_m: 2, yatayMesafe_r_m: 0 };

describe("Zeminde Gerilme Artışı", () => {
  it("2:1: P = 1000 kN, 2×2 m, z = 2 m → 1000/(4·4) = 62,5 kPa (q0 = 250)", () => {
    const r = zeminGerilmeArtisi.compute({ ...t, yontem: "iki-bir" });
    expect(r.value.gerilmeArtisi_kPa).toBeCloseTo(62.5, 6);
    expect(r.intermediates.temel_basinci_kPa).toBe(250);
  });
  it("Boussinesq: r = 0 → 3P/(2πz²) = 119,37 kPa (IB = 0,4775)", () => {
    const r = zeminGerilmeArtisi.compute({ ...t, yontem: "boussinesq" });
    expect(r.value.gerilmeArtisi_kPa).toBeCloseTo(119.366, 2);
    expect(r.intermediates.etki_katsayisi_IB as number).toBeCloseTo(0.4775, 4);
  });
  it("Boussinesq: r = z → (1/2)^2,5 = 0,17678 çarpanı → 21,10 kPa", () => {
    const r = zeminGerilmeArtisi.compute({ ...t, yontem: "boussinesq", yatayMesafe_r_m: 2 });
    expect(r.value.gerilmeArtisi_kPa).toBeCloseTo(21.1, 1);
  });
});
