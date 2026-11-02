import { describe, it, expect } from "vitest";
import { isiEsanjoruKirlenmeU } from "./isi-esanjoru-kirlenme-u";

describe("Eşanjör Toplam Isı Geçirgenliği", () => {
  const o = { h1_Wm2K: 5000, h2_Wm2K: 3000, cidarKalinligi_mm: 1, cidarIletkenligi_WmK: 16, kirlenme1_m2KW: 0.0002, kirlenme2_m2KW: 0.0002 };
  it("1/U = 1/5000+0,0002+0,0000625+0,0002+1/3000 → U ≈ 1004 (temiz ≈ 1678) W/m²K", () => {
    const r = isiEsanjoruKirlenmeU.compute(o);
    expect(r.value.U_kirli_Wm2K).toBeCloseTo(1004.2, 1);
    expect(r.intermediates.U_temiz_Wm2K as number).toBeCloseTo(1678.3, 1);
    expect(r.intermediates.fazla_alan_yuzde as number).toBeCloseTo(67.1, 1);
  });
  it("kirlenme yoksa temiz = kirli", () => {
    const r = isiEsanjoruKirlenmeU.compute({ ...o, kirlenme1_m2KW: 0, kirlenme2_m2KW: 0 });
    expect(r.value.U_kirli_Wm2K).toBeCloseTo(r.intermediates.U_temiz_Wm2K as number, 9);
  });
});
