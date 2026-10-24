import { describe, it, expect } from "vitest";
import { evSicaklikKonforKontrolu } from "./ev-sicaklik-konfor-kontrolu";

describe("Ev Sıcaklık Konfor Kontrolü", () => {
  it("20°C iç, 0°C dış → PMV=0, PPD<20 (uygun)", () => {
    const r = evSicaklikKonforKontrolu.compute({ ic_sicaklik_C: 20, dis_sicaklik_C: 0 });
    expect(r.value.pmv).toBeCloseTo(0, 0);
    expect(r.verdict?.status).toBe("uygun");
  });
});
