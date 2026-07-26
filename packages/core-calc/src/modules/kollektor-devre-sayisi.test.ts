import { describe, expect, it } from "vitest";
import { kollektorDevreSayisi } from "./kollektor-devre-sayisi";

describe("kollektor-devre-sayisi", () => {
  it("Toplam debi=10 m³/h, devre debisi=0.8 m³/h → 13 devre", () => {
    const r = kollektorDevreSayisi.compute({ toplamDebi_m3h: 10, devreDebisi_m3h: 0.8 });

    expect(r.value.devreSayisi).toBe(13);
    expect(r.intermediates.devreBasinaGercekDebi_m3h).toBeCloseTo(0.7692, 3);
  });
});
