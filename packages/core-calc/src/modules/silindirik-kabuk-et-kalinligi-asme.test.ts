import { describe, it, expect } from "vitest";
import { silindirikKabukEtKalinligiAsme } from "./silindirik-kabuk-et-kalinligi-asme";

describe("Basınçlı Kap Kabuk Et Kalınlığı (UG-27)", () => {
  const g = { tasarimBasinci_MPa: 1.5, icYaricap_mm: 500, izinVerilenGerilme_MPa: 138, birlesimVerimi_E: 0.85, korozyonPayi_mm: 1.5, kabukTipi: "silindir" as const };
  it("1,5 MPa, R 500, S 138, E 0,85: çevresel 6,4433, boyuna 3,1888; +1,5 mm → 7,9433 mm", () => {
    const r = silindirikKabukEtKalinligiAsme.compute(g);
    expect(r.intermediates.cevresel_t_mm as number).toBeCloseTo(6.4433, 4);
    expect(r.intermediates.boyuna_t_mm as number).toBeCloseTo(3.1888, 4);
    expect(r.value.gerekliEtKalinligi_mm).toBeCloseTo(7.9433, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("küre: t = PR/(2SE − 0,2P) = 3,2010 mm; boyuna ≈ çevreselin yarısı", () => {
    const r = silindirikKabukEtKalinligiAsme.compute({ ...g, kabukTipi: "kure", korozyonPayi_mm: 0 });
    expect(r.value.gerekliEtKalinligi_mm).toBeCloseTo(3.201, 3);
    const c = silindirikKabukEtKalinligiAsme.compute({ ...g, korozyonPayi_mm: 0 });
    expect((c.intermediates.boyuna_t_mm as number) / (c.intermediates.cevresel_t_mm as number)).toBeCloseTo(0.495, 2);
  });
  it("P > 0,385·S·E (45,2 MPa) kalın cidar → uygunsuz", () => {
    expect(silindirikKabukEtKalinligiAsme.compute({ ...g, tasarimBasinci_MPa: 50 }).verdict?.status).toBe("uygunsuz");
  });
});
