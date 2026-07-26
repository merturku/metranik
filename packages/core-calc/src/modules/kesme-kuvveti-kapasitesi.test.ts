import { describe, expect, it } from "vitest";
import { kesmeKuvvetiKapasitesi } from "./kesme-kuvveti-kapasitesi";

describe("kesme-kuvveti-kapasitesi", () => {
  it("TS 500: fck=25MPa, bw=300mm, d=450mm → 236.25 kN", () => {
    const r = kesmeKuvvetiKapasitesi.compute({
      betonKarakteristikDayanim_fck_MPa: 25,
      kesitGenisligi_bw_mm: 300,
      faydaliYukseklik_d_mm: 450,
    });

    expect(r.value.kesmeKapasitesi_kN).toBeCloseTo(236.25, 2);
  });
});
