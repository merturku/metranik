import { describe, expect, it } from "vitest";
import { ruzgarYukuHesabi } from "./ruzgar-yuku-hesabi";

describe("ruzgar-yuku-hesabi", () => {
  it("TS EN 1991-1-4: vb=28 m/s, ce=2.5, cpe=0.8 → we=0.98 kN/m²", () => {
    const r = ruzgarYukuHesabi.compute({
      temelRuzgarHizi_ms: 28,
      maruziyetKatsayisi_ce: 2.5,
      basincKatsayisi_cpe: 0.8,
    });

    expect(r.intermediates.temelHizBasinci_qb_Pa).toBeCloseTo(490, 5);
    expect(r.intermediates.tepeHizBasinci_qp_Pa).toBeCloseTo(1225, 5);
    expect(r.value.ruzgarBasinci_kNm2).toBeCloseTo(0.98, 5);
  });

  it("daha yüksek temel rüzgar hızı, basıncı karesel olarak artırır", () => {
    const dusuk = ruzgarYukuHesabi.compute({
      temelRuzgarHizi_ms: 20,
      maruziyetKatsayisi_ce: 2,
      basincKatsayisi_cpe: 0.8,
    });
    const yuksek = ruzgarYukuHesabi.compute({
      temelRuzgarHizi_ms: 40,
      maruziyetKatsayisi_ce: 2,
      basincKatsayisi_cpe: 0.8,
    });

    expect(yuksek.value.ruzgarBasinci_kNm2).toBeCloseTo(dusuk.value.ruzgarBasinci_kNm2 * 4, 5);
  });
});
