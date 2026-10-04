import { describe, it, expect } from "vitest";
import { isiDegistiricietkinligi } from "./isi-degistirici-etkinligi";

describe("Isı Değiştirici Etkinliği", () => {
  it("80→65°C sicak, 20°C soguk → 75% etkinlik", () => {
    const r = isiDegistiricietkinligi.compute({ sicak_giris_C: 80, sicak_cikis_C: 65, soguk_giris_C: 20 });
    expect(r.value.etkinlik_yuzde).toBeCloseTo(75, 0);
  });
});
