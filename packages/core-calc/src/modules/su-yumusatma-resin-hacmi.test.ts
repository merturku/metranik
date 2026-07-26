import { describe, expect, it } from "vitest";
import { suYumusatmaResinHacmi } from "./su-yumusatma-resin-hacmi";

describe("su-yumusatma-resin-hacmi", () => {
  it("sertlik=5mekv/L, debi=2000L/gün, süre=1gün, resin=2ekv/L → 5 L", () => {
    const r = suYumusatmaResinHacmi.compute({
      suSertligi_mekvL: 5,
      gunlukDebi_Lgun: 2000,
      calismaSuresi_gun: 1,
      resinKapasitesi_ekvL: 2,
    });

    expect(r.intermediates.toplamSertlikYuku_mekv).toBeCloseTo(10000, 5);
    expect(r.value.gerekliResinHacmi_L).toBeCloseTo(5, 5);
  });
});
