import { describe, it, expect } from "vitest";
import { primerSekonderAyiriciBypass } from "./primer-sekonder-ayirici-bypass";

describe("Primer–Sekonder Ayırıcı", () => {
  it("Qp 100, Qs 80 m³/h, Tg 7, Tsd 12 → Qb 20; primer dönüş (80·12+20·7)/100 = 11 °C; ΔT 4 K", () => {
    const r = primerSekonderAyiriciBypass.compute({ primerDebi_m3h: 100, sekonderDebi_m3h: 80, primerGidisSicakligi_C: 7, sekonderDonusSicakligi_C: 12 });
    expect(r.value.ayiriciDebisi_m3h).toBeCloseTo(20, 10);
    expect(r.intermediates.primer_donus_karisim_C as number).toBeCloseTo(11, 10);
    expect(r.intermediates.primer_deltaT_K as number).toBeCloseTo(4, 10);
    expect(r.intermediates.primer_isil_guc_kW as number).toBeCloseTo((100 * 4186 * 4) / 3600, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("Qs 100 > Qp 80 → Qb −20, sekonder besleme (80·7+20·12)/100 = 8 °C, uygunsuz", () => {
    const r = primerSekonderAyiriciBypass.compute({ primerDebi_m3h: 80, sekonderDebi_m3h: 100, primerGidisSicakligi_C: 7, sekonderDonusSicakligi_C: 12 });
    expect(r.value.ayiriciDebisi_m3h).toBeCloseTo(-20, 10);
    expect(r.intermediates.sekonder_gidis_C as number).toBeCloseTo(8, 10);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("Qp = Qs → ayırıcı debisi 0, primer dönüş = sekonder dönüş", () => {
    const r = primerSekonderAyiriciBypass.compute({ primerDebi_m3h: 50, sekonderDebi_m3h: 50, primerGidisSicakligi_C: 7, sekonderDonusSicakligi_C: 12 });
    expect(r.value.ayiriciDebisi_m3h).toBe(0);
    expect(r.intermediates.primer_donus_karisim_C as number).toBeCloseTo(12, 10);
  });
});
