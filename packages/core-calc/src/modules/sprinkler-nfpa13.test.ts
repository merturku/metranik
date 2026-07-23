import { describe, expect, it } from "vitest";
import { sprinklerNfpa13 } from "./sprinkler-nfpa13";

describe("sprinkler-nfpa13", () => {
  // Q = K√P, bağımsız doğrulanabilir: K=80, P=1 bar → Q=80 L/dk.
  it("K=80, 1 bar için debiyi hesaplar", () => {
    const r = sprinklerNfpa13.compute({ kFaktoru: 80, basinc_bar: 1 });
    expect(r.value.debi_L_dk).toBeCloseTo(80, 5);
  });

  it("K=80, 4 bar için debiyi hesaplar (√4=2)", () => {
    const r = sprinklerNfpa13.compute({ kFaktoru: 80, basinc_bar: 4 });
    expect(r.value.debi_L_dk).toBeCloseTo(160, 5);
  });
});
