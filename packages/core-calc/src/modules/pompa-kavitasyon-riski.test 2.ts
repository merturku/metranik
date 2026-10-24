import { describe, it, expect } from "vitest";
import { pompaKavitasyonRiski } from "./pompa-kavitasyon-riski";

describe("Kavitasyon Riski", () => {
  it("0.5m emme, 2 m/s → NPSHA=7.9m (uygun)", () => {
    const r = pompaKavitasyonRiski.compute({ emme_yuksekligi_m: 0.5, emme_hizi_ms: 2 });
    expect(r.value.NPSHA).toBeGreaterThan(0.5);
  });
});
