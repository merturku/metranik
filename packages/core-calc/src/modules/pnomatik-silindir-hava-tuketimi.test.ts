import { describe, it, expect } from "vitest";
import { pnomatikSilindirHavaTuketimi } from "./pnomatik-silindir-hava-tuketimi";

describe("Pnömatik Silindir Hava Tüketimi", () => {
  it("Ø63, kurs 200, çift etkili, 30/dk, 6 bar-g: çevrim 1,2469 L; oran 6,9215; 8,630 L/çevrim; 258,9 L/dk", () => {
    const r = pnomatikSilindirHavaTuketimi.compute({ piston_mm: 63, kurs_mm: 200, devir_dk: 30, basinc_barg: 6, etki: "cift" });
    expect(r.intermediates.cevrim_hacmi_L as number).toBeCloseTo(1.246898, 5);
    expect(r.intermediates.sikistirma_orani as number).toBeCloseTo(6.92154, 4);
    expect(r.intermediates.serbest_hava_cevrim_L as number).toBeCloseTo(8.630455, 4);
    expect(r.value.serbestHava_Ldk).toBeCloseTo(258.9136, 3);
  });
  it("tek etkili = çift etkilinin yarısı; basınç 0'a yaklaşırsa oran → 1", () => {
    const g = { piston_mm: 63, kurs_mm: 200, devir_dk: 30, basinc_barg: 6 };
    const c = pnomatikSilindirHavaTuketimi.compute({ ...g, etki: "cift" }).value.serbestHava_Ldk;
    expect(pnomatikSilindirHavaTuketimi.compute({ ...g, etki: "tek" }).value.serbestHava_Ldk / c).toBeCloseTo(0.5, 10);
    expect(pnomatikSilindirHavaTuketimi.compute({ ...g, basinc_barg: 1e-9, etki: "tek" }).intermediates.sikistirma_orani as number).toBeCloseTo(1, 6);
  });
});
