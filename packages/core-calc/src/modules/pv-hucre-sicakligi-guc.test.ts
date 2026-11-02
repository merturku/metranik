import { describe, it, expect } from "vitest";
import { pvHucreSicakligiGuc } from "./pv-hucre-sicakligi-guc";

describe("GES Panel Hücre Sıcaklığı ve Güç Kaybı", () => {
  const o = { pstc_W: 400, isinim_Wm2: 800, ortamSicakligi_C: 30, noct_C: 45, gucSicaklikKatsayisi_1K: -0.0035 };
  it("800 W/m², 30 °C, NOCT 45 → Thücre 55 °C, P = 400·0,8·0,895 = 286,4 W", () => {
    const r = pvHucreSicakligiGuc.compute(o);
    expect(r.intermediates.hucre_sicakligi_C).toBeCloseTo(55, 9);
    expect(r.value.guc_W).toBeCloseTo(286.4, 6);
    expect(r.intermediates.sicaklik_kaybi_yuzde).toBeCloseTo(10.5, 9);
  });
  it("Thücre = 25 °C ve 1000 W/m² → Pstc (kayıp yok)", () => {
    const r = pvHucreSicakligiGuc.compute({ ...o, isinim_Wm2: 1000, ortamSicakligi_C: 25 - (25 / 800) * 1000 });
    expect(r.value.guc_W).toBeCloseTo(400, 6);
  });
});
