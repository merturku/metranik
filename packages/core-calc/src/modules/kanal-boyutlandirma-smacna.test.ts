import { describe, expect, it } from "vitest";
import { kanalBoyutlandirmaSmacna } from "./kanal-boyutlandirma-smacna";

describe("kanal-boyutlandirma-smacna", () => {
  // Süreklilik denklemi Q = V·A, bağımsız doğrulanabilir:
  // A = 0.5 / 5 = 0.1 m² → D = sqrt(4×0.1/π) = 0.35682 m ≈ 356.8 mm.
  it("0.5 m³/s debi, 5 m/s hedef hız için kanal çapını hesaplar", () => {
    const r = kanalBoyutlandirmaSmacna.compute({ debi: 0.5, hiz: 5 });

    expect(r.value.capD_mm).toBeCloseTo(356.83, 1);
    expect(r.intermediates.kesitAlani_m2).toBeCloseTo(0.1, 5);
  });

  it("aynı debide daha yüksek hız daha küçük kanal verir", () => {
    const dusukHiz = kanalBoyutlandirmaSmacna.compute({ debi: 0.5, hiz: 4 });
    const yuksekHiz = kanalBoyutlandirmaSmacna.compute({ debi: 0.5, hiz: 8 });

    expect(yuksekHiz.value.capD_mm).toBeLessThan(dusukHiz.value.capD_mm);
  });
});
