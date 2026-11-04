import { describe, it, expect } from "vitest";
import { tazeBetonSicakligi } from "./taze-beton-sicakligi";

const base = { agrega_kg: 1800, cimento_kg: 350, karisimSuyu_kg: 160, agregaSicakligi_C: 30, cimentoSicakligi_C: 40, suSicakligi_C: 15 };

describe("Taze Beton Sıcaklığı", () => {
  it("Wa 1800, Wc 350, Ww 160, nem 0; 30/40/15 °C → 17 360/633 ≈ 27,42 °C", () => {
    const r = tazeBetonSicakligi.compute({ ...base, agregaNemi_kg: 0 });
    expect(r.value.betonSicakligi_C).toBeCloseTo(27.42, 2);
  });
  it("agrega nemi 60 kg (agrega sıcaklığında) → 19 160/693 ≈ 27,65 °C", () => {
    const r = tazeBetonSicakligi.compute({ ...base, agregaNemi_kg: 60 });
    expect(r.value.betonSicakligi_C).toBeCloseTo(27.65, 2);
  });
  it("tüm bileşenler aynı sıcaklıkta → karışım da o sıcaklıkta", () => {
    const r = tazeBetonSicakligi.compute({ ...base, agregaNemi_kg: 40, agregaSicakligi_C: 20, cimentoSicakligi_C: 20, suSicakligi_C: 20 });
    expect(r.value.betonSicakligi_C).toBeCloseTo(20, 9);
  });
});
