import { describe, it, expect } from "vitest";
import { sprinklerKaynakBasinciGereksinimi } from "./sprinkler-kaynak-basinci-gereksinimi";

describe("Sprinkler Kaynak Basıncı Gereksinimi", () => {
  const g = { baslikBasinci_bar: 0.7, surtunmeKaybi_bar: 1.2, yukseklik_m: 15, alarmVanaKaybi_bar: 0.35, emniyetPayi_bar: 0.5, mevcutBasinc_bar: 5 };
  it("0,7 + 1,2 + 0,0981·15 + 0,35 + 0,5 = 4,221 bar; mevcut 5 bar → uygun, fazla 0,7785", () => {
    const r = sprinklerKaynakBasinciGereksinimi.compute(g);
    expect(r.intermediates.statik_basinc_bar as number).toBeCloseTo(1.4710, 3);
    expect(r.value.gerekliBasinc_bar).toBeCloseTo(4.22100, 3);
    expect(r.intermediates.mevcut_fazla_bar as number).toBeCloseTo(0.779, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("mevcut 4 bar → uygunsuz", () => {
    expect(sprinklerKaynakBasinciGereksinimi.compute({ ...g, mevcutBasinc_bar: 4 }).verdict?.status).toBe("uygunsuz");
  });
  it("kaynak sprinklerden yüksekteyse (negatif yükseklik) statik basınç azaltır", () => {
    const r = sprinklerKaynakBasinciGereksinimi.compute({ ...g, yukseklik_m: -10 });
    expect(r.intermediates.statik_basinc_bar as number).toBeCloseTo(-0.980665, 6);
  });
});
