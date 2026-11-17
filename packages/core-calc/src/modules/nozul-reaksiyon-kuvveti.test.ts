import { describe, it, expect } from "vitest";
import { nozulReaksiyonKuvveti } from "./nozul-reaksiyon-kuvveti";

describe("Nozul Reaksiyon Kuvveti", () => {
  it("500 L/dk, Ø20 mm: v = 26,526 m/s; F = 221,05 N", () => {
    const r = nozulReaksiyonKuvveti.compute({ q_Lmin: 500, d_mm: 20 });
    expect(r.intermediates.jet_hizi_ms as number).toBeCloseTo(26.5258, 3);
    expect(r.value.reaksiyon_N).toBeCloseTo(221.0485, 3);
    expect(r.intermediates.jet_dinamik_basinc_bar as number).toBeCloseTo(3.5181, 3);
  });
  it("debi iki katı → kuvvet 4 kat; çap yarısı → kuvvet 4 kat", () => {
    const a = nozulReaksiyonKuvveti.compute({ q_Lmin: 500, d_mm: 20 }).value.reaksiyon_N;
    expect(nozulReaksiyonKuvveti.compute({ q_Lmin: 1000, d_mm: 20 }).value.reaksiyon_N / a).toBeCloseTo(4, 8);
    expect(nozulReaksiyonKuvveti.compute({ q_Lmin: 500, d_mm: 10 }).value.reaksiyon_N / a).toBeCloseTo(4, 8);
  });
});
