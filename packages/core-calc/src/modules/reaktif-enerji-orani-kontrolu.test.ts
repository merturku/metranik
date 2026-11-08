import { describe, it, expect } from "vitest";
import { reaktifEnerjiOraniKontrolu } from "./reaktif-enerji-orani-kontrolu";

const g = { aktifEnerji_kWh: 10000, enduktifReaktif_kVArh: 1500, kapasitifReaktif_kVArh: 0, enduktifSinir_yuzde: 20, kapasitifSinir_yuzde: 15 };

describe("Reaktif Enerji Oranı Kontrolü", () => {
  it("10000 kWh, 1500 kVArh → %15; cosφ = 1/√1,0225 = 0,98893; uygun", () => {
    const r = reaktifEnerjiOraniKontrolu.compute(g);
    expect(r.value.enduktifOran_yuzde).toBeCloseTo(15, 8);
    expect(r.intermediates.ortalama_cosphi_enduktif as number).toBeCloseTo(0.98893, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("%19 sınırın %90'ından fazla → sınırda; %25 → uygunsuz, aşan 500 kVArh", () => {
    expect(reaktifEnerjiOraniKontrolu.compute({ ...g, enduktifReaktif_kVArh: 1900 }).verdict?.status).toBe("sinirda");
    const r = reaktifEnerjiOraniKontrolu.compute({ ...g, enduktifReaktif_kVArh: 2500 });
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(r.intermediates.sinir_asan_enduktif_kVArh as number).toBeCloseTo(500, 8);
  });
  it("kapasitif oran sınırı aşılınca uygunsuz", () => {
    const r = reaktifEnerjiOraniKontrolu.compute({ ...g, kapasitifReaktif_kVArh: 2000 });
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(r.intermediates.sinir_asan_kapasitif_kVArh as number).toBeCloseTo(500, 8);
  });
});
