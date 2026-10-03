import { describe, it, expect } from "vitest";
import { zeminAltlıkGerilmeKontrolu } from "./zemin-altlık-gerilme-kontrolu";

describe("Zemin Altlık Gerilme", () => {
  it("1000 kN, 10 m², no moment → 100 kPa (uygun)", () => {
    const r = zeminAltlıkGerilmeKontrolu.compute({ yuk_kN: 1000, temel_alani_m2: 10 });
    expect(r.value.max_gerilme_kPa).toBeCloseTo(100, 0);
  });
});
