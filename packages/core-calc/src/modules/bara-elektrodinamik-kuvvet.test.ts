import { describe, expect, it } from "vitest";
import { baraElektrodinamikKuvvet } from "./bara-elektrodinamik-kuvvet";

describe("baraElektrodinamikKuvvet", () => {
  it("Ip=20kA, L=1m, d=0.15m → F≈533.3 N", () => {
    const r = baraElektrodinamikKuvvet.compute({
      tepeKisaDevreAkimi_Ip_A: 20000,
      destekAcikligi_L_m: 1,
      iletkenlerArasiMesafe_d_m: 0.15,
    });
    expect(r.value.kuvvet_F_N).toBeCloseTo(533.333, 2);
  });
});
