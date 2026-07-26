import { describe, expect, it } from "vitest";
import { kolonNarinlikKontrolu } from "./kolon-narinlik-kontrolu";

describe("kolon-narinlik-kontrolu", () => {
  it("Lk=3m, h=300mm, λlim=40 → λ≈34.64, uygun", () => {
    const r = kolonNarinlikKontrolu.compute({
      etkiliBoy_Lk_m: 3,
      kesitBoyutu_h_mm: 300,
      narinlikSiniri_lambdaLim: 40,
    });

    expect(r.intermediates.ataletYaricapi_i_m).toBeCloseTo(0.08660, 4);
    expect(r.value.narinlikOrani_lambda).toBeCloseTo(34.641, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("küçük kesitli/uzun kolon narinlik sınırını aşabilir → uygunsuz", () => {
    const r = kolonNarinlikKontrolu.compute({
      etkiliBoy_Lk_m: 6,
      kesitBoyutu_h_mm: 200,
      narinlikSiniri_lambdaLim: 40,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
