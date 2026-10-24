import { describe, it, expect } from "vitest";
import { sogutmaMenteşeBasinci } from "./sogutma-menteşe-basinci-kontrolu";

describe("Soğutma Menteşe Basıncı", () => {
  it("10 kW, 100 L/min → 10 bar", () => {
    const r = sogutmaMenteşeBasinci.compute({ sogutma_kapasitesi_kW: 10, debi_Lmin: 100 });
    expect(r.value.basinc_bar).toBe(10);
  });
});
