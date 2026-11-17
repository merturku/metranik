import { describe, it, expect } from "vitest";
import { awgMm2Donusumu } from "./awg-mm2-donusumu";

describe("AWG – mm² Dönüşümü", () => {
  it("AWG 10: d = 2,5882 mm; A = 5,2612 mm² (tablo 5,26); en yakın IEC 6 mm²", () => {
    const r = awgMm2Donusumu.compute({ awg: 10 });
    expect(r.intermediates.cap_mm as number).toBeCloseTo(2.58819, 4);
    expect(r.value.kesit_mm2).toBeCloseTo(5.26115, 4);
    expect(r.intermediates.en_yakin_iec_kesit_mm2).toBe(6);
  });
  it("AWG 4/0 (−3): d = 11,684 mm (tanım değeri), A = 107,2 mm²; AWG 14 ≈ 2,08 mm²", () => {
    const r = awgMm2Donusumu.compute({ awg: -3 });
    expect(r.intermediates.cap_mm as number).toBeCloseTo(11.684, 3);
    expect(r.value.kesit_mm2).toBeCloseTo(107.219, 2);
    expect(awgMm2Donusumu.compute({ awg: 14 }).value.kesit_mm2).toBeCloseTo(2.0809, 3);
  });
  it("her 6 numarada çap yaklaşık ikiye katlanır (92^(6/39) = 2,005)", () => {
    const a = awgMm2Donusumu.compute({ awg: 16 }).intermediates.cap_mm as number;
    const b = awgMm2Donusumu.compute({ awg: 10 }).intermediates.cap_mm as number;
    expect(b / a).toBeCloseTo(Math.pow(92, 6 / 39), 8);
  });
});
