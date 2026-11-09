import { describe, it, expect } from "vitest";
import { zeminDarcySizmaDebisi } from "./zemin-darcy-sizma-debisi";

const g = { hidrolikIletkenlik_k_ms: 1e-5, yuksekFarki_dh_m: 3, sizmaYolu_L_m: 10, kesitAlani_A_m2: 20, gozeneklilik_n: 0.4, ozgulAgirlik_Gs: 2.65 };

describe("Darcy Sızma Debisi", () => {
  it("k = 1e-5 m/s, i = 0,3, A = 20 m²: v = 3e-6 m/s; Q = 6e-5 m³/s = 0,216 m³/h; sızma hızı 7,5e-6", () => {
    const r = zeminDarcySizmaDebisi.compute(g);
    expect(r.intermediates.hidrolik_gradyan_i as number).toBeCloseTo(0.3, 10);
    expect(r.value.sizmaDebisi_m3s).toBeCloseTo(6e-5, 12);
    expect(r.intermediates.debi_m3h as number).toBeCloseTo(0.216, 6);
    expect(r.intermediates.sizma_hizi_ms as number).toBeCloseTo(7.5e-6, 12);
  });
  it("n = 0,4 → e = 0,667; i_kr = 1,65/1,667 = 0,99; FS = 3,3 → uygun; i = 0,6 → FS 1,65 sınırda; i = 0,9 → uygunsuz", () => {
    const r = zeminDarcySizmaDebisi.compute(g);
    expect(r.intermediates.kritik_gradyan_ikr as number).toBeCloseTo(0.99, 2);
    expect(r.verdict?.status).toBe("uygun");
    expect(zeminDarcySizmaDebisi.compute({ ...g, yuksekFarki_dh_m: 6 }).verdict?.status).toBe("sinirda");
    expect(zeminDarcySizmaDebisi.compute({ ...g, yuksekFarki_dh_m: 9 }).verdict?.status).toBe("uygunsuz");
  });
});
