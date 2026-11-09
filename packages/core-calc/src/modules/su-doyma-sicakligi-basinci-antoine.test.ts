import { describe, it, expect } from "vitest";
import { suDoymaSicakligiBasinciAntoine } from "./su-doyma-sicakligi-basinci-antoine";

describe("Su Doyma Sıcaklığı–Basıncı (Antoine)", () => {
  it("100 °C → 101,3 kPa (760 mmHg); 20 °C → 2,33 kPa (tablo 2,339)", () => {
    const a = suDoymaSicakligiBasinciAntoine.compute({ yon: "sicakliktan-basinc", deger: 100 });
    expect(a.value.sonuc as number).toBeCloseTo(101.3, 0);
    const b = suDoymaSicakligiBasinciAntoine.compute({ yon: "sicakliktan-basinc", deger: 20 });
    expect(b.value.sonuc as number).toBeCloseTo(2.34, 1);
  });
  it("101,325 kPa → ≈ 100 °C; 150 °C → ≈ 475 kPa (tablo 475,8; ±%1)", () => {
    expect(suDoymaSicakligiBasinciAntoine.compute({ yon: "basinctan-sicaklik", deger: 101.325 }).value.sonuc as number).toBeCloseTo(100, 0);
    const p = suDoymaSicakligiBasinciAntoine.compute({ yon: "sicakliktan-basinc", deger: 150 }).value.sonuc as number;
    expect(p).toBeGreaterThan(470);
    expect(p).toBeLessThan(481);
  });
  it("gidiş-dönüş tutarlılığı: T → P → T; aralık dışı null", () => {
    const p = suDoymaSicakligiBasinciAntoine.compute({ yon: "sicakliktan-basinc", deger: 120 }).value.sonuc as number;
    expect(suDoymaSicakligiBasinciAntoine.compute({ yon: "basinctan-sicaklik", deger: p }).value.sonuc as number).toBeCloseTo(120, 6);
    expect(suDoymaSicakligiBasinciAntoine.compute({ yon: "sicakliktan-basinc", deger: 400 }).value.sonuc).toBeNull();
  });
});
