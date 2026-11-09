import { describe, it, expect } from "vitest";
import { katYanalRijitligiOtelenme } from "./kat-yanal-rijitligi-otelenme";

const g = { elastisiteModulu_MPa: 32000, kolonGenisligi_mm: 400, kolonYuksekligi_mm: 400, katYuksekligi_mm: 3000, kolonSayisi: 4, rijitlikCarpani: 1, yatayYuk_kN: 100, katKutlesi_ton: 200 };

describe("Kat Yanal Rijitliği ve Ötelenme", () => {
  it("C30 (32 GPa), 400×400, h = 3 m: k = 12EI/h³ = 30,34 kN/mm; 4 kolon 121,36 kN/mm; H = 100 kN → 0,824 mm", () => {
    const r = katYanalRijitligiOtelenme.compute(g);
    expect(r.intermediates.tek_kolon_rijitligi_kNmm as number).toBeCloseTo(30.34, 1);
    expect(r.value.katRijitligi_kNmm).toBeCloseTo(121.36, 1);
    expect(r.intermediates.otelenme_mm as number).toBeCloseTo(0.824, 3);
    expect(r.intermediates.goreli_otelenme_orani as number).toBeCloseTo(0.000275, 6);
  });
  it("T = 2π√(m/K): 200 t, K = 1,2136e8 N/m → 0,2551 s", () => {
    expect(katYanalRijitligiOtelenme.compute(g).intermediates.dogal_periyot_s as number).toBeCloseTo(0.2551, 3);
  });
  it("etkin rijitlik çarpanı 0,7 → rijitlik 0,7 katı; ötelenme 1/0,7 katı", () => {
    const a = katYanalRijitligiOtelenme.compute(g);
    const b = katYanalRijitligiOtelenme.compute({ ...g, rijitlikCarpani: 0.7 });
    expect(b.value.katRijitligi_kNmm / a.value.katRijitligi_kNmm).toBeCloseTo(0.7, 8);
    expect((b.intermediates.otelenme_mm as number) / (a.intermediates.otelenme_mm as number)).toBeCloseTo(1 / 0.7, 8);
  });
});
