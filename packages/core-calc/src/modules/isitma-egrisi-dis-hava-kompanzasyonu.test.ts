import { describe, it, expect } from "vitest";
import { isitmaEgrisiDisHavaKompanzasyonu } from "./isitma-egrisi-dis-hava-kompanzasyonu";

const base = { icSicaklik_C: 20, tasarimDisSicaklik_C: -5, tasarimGidis_C: 75, tasarimDonus_C: 65, radyatorUssu: 1.3 };

describe("Isıtma Eğrisi (Dış Hava Kompanzasyonu)", () => {
  it("75/65, Ti 20, Te,tas −5, Te 7,5 (φ 0,5), n 1,3 → gidiş ≈ 51,84 °C, dönüş ≈ 46,84 °C", () => {
    const r = isitmaEgrisiDisHavaKompanzasyonu.compute({ ...base, anlikDisSicaklik_C: 7.5 });
    expect(r.intermediates.yuk_orani as number).toBeCloseTo(0.5, 6);
    expect(r.value.gidisSicakligi_C).toBeCloseTo(51.84, 1);
    expect(r.intermediates.donus_sicakligi_C as number).toBeCloseTo(46.84, 1);
  });
  it("tasarım dış sıcaklığında tasarım gidiş sıcaklığını (75 °C) verir", () => {
    const r = isitmaEgrisiDisHavaKompanzasyonu.compute({ ...base, anlikDisSicaklik_C: -5 });
    expect(r.value.gidisSicakligi_C).toBeCloseTo(75, 6);
  });
});
