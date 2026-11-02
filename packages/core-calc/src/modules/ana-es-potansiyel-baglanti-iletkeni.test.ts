import { describe, it, expect } from "vitest";
import { anaEsPotansiyelBaglantiIletkeni } from "./ana-es-potansiyel-baglanti-iletkeni";

const k = (pe: number) => anaEsPotansiyelBaglantiIletkeni.compute({ enBuyukPeKesiti_mm2: pe }).value.baglantiKesiti_mm2;

describe("Ana Eş Potansiyel Bağlantı İletkeni", () => {
  it("PE 4 → 2 → alt sınır 6; PE 16 → 8 → 10; PE 35 → 17,5 → 25", () => {
    expect(k(4)).toBe(6);
    expect(k(16)).toBe(10);
    expect(k(35)).toBe(25);
  });
  it("PE 120 → 60 → üst sınır 25", () => {
    const r = anaEsPotansiyelBaglantiIletkeni.compute({ enBuyukPeKesiti_mm2: 120 });
    expect(r.value.baglantiKesiti_mm2).toBe(25);
    expect(r.intermediates.sinir_durumu).toBe("Üst sınır 25 mm² belirleyici");
  });
});
