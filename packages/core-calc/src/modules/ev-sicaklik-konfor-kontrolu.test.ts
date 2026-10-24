import { describe, it, expect } from "vitest";
import { evSicaklikKonforKontrolu } from "./ev-sicaklik-konfor-kontrolu";

function hesapla(ta: number, tr: number, v: number, rh: number, met: number, clo: number) {
  return evSicaklikKonforKontrolu.compute({
    hava_sicakligi_C: ta,
    ortalama_isinim_sicakligi_C: tr,
    hava_hizi_ms: v,
    bagil_nem_yuzde: rh,
    metabolizma_met: met,
    giysi_clo: clo,
  });
}

// Beklenen değerler ISO 7730:2005 Tablo D.1 çözümlü örneklerindendir.
describe("Ev Sıcaklık Konfor Kontrolü (ISO 7730 PMV/PPD)", () => {
  it("ta = tr = 22 °C, 0,1 m/s, %60, 1,2 met, 0,5 clo → PMV −0,75, PPD %17 → uygunsuz", () => {
    const r = hesapla(22, 22, 0.1, 60, 1.2, 0.5);
    expect(r.value.pmv).toBeCloseTo(-0.75, 1);
    expect(Math.abs(r.value.ppd_yuzde - 17)).toBeLessThan(1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("ta = 23,5 °C, tr = 25,5 °C, 0,1 m/s, %60, 1,2 met, 0,5 clo → PMV −0,01, PPD %5 → uygun", () => {
    const r = hesapla(23.5, 25.5, 0.1, 60, 1.2, 0.5);
    expect(r.value.pmv).toBeCloseTo(-0.01, 1);
    expect(Math.abs(r.value.ppd_yuzde - 5)).toBeLessThan(1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ta = tr = 19 °C, 0,1 m/s, %40, 1,2 met, 1,0 clo → PMV −0,60, PPD %13 → sınırda", () => {
    const r = hesapla(19, 19, 0.1, 40, 1.2, 1.0);
    expect(r.value.pmv).toBeCloseTo(-0.6, 1);
    expect(Math.abs(r.value.ppd_yuzde - 13)).toBeLessThan(1);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("ta = tr = 27 °C, 0,1 m/s, %60, 1,6 met, 0,5 clo → PMV 1,17, PPD %34 → uygunsuz", () => {
    const r = hesapla(27, 27, 0.1, 60, 1.6, 0.5);
    expect(r.value.pmv).toBeCloseTo(1.17, 1);
    expect(Math.abs(r.value.ppd_yuzde - 34)).toBeLessThan(1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
