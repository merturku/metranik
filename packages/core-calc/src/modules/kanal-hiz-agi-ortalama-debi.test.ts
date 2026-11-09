import { describe, it, expect } from "vitest";
import { kanalHizAgiOrtalamaDebi } from "./kanal-hiz-agi-ortalama-debi";

const g = { kesitAlani_m2: 0.3, v1: 5, v2: 6, v3: 7, v4: 6, v5: 5, v6: 7, tasarimDebisi_m3h: 6480 };

describe("Kanal Hız Taraması", () => {
  it("5,6,7,6,5,7 m/s → V̄ = 6; Q = 6·0,3·3600 = 6480 m³/h; sapma 0; uygun", () => {
    const r = kanalHizAgiOrtalamaDebi.compute(g);
    expect(r.intermediates.ortalama_hiz_ms).toBe(6);
    expect(r.value.debi_m3h).toBeCloseTo(6480, 6);
    expect(r.intermediates.standart_sapma_ms as number).toBeCloseTo(0.8165, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("tasarım 5500 → sapma %17,8 → uygunsuz; 7000 → %−7,4 uygun; 0 nokta → uygunsuz", () => {
    expect(kanalHizAgiOrtalamaDebi.compute({ ...g, tasarimDebisi_m3h: 5500 }).verdict?.status).toBe("uygunsuz");
    expect(kanalHizAgiOrtalamaDebi.compute({ ...g, tasarimDebisi_m3h: 7000 }).verdict?.status).toBe("uygun");
    expect(kanalHizAgiOrtalamaDebi.compute({ ...g, v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 0 }).verdict?.status).toBe("uygunsuz");
  });
  it("yalnız ölçülen (sıfırdan büyük) noktalar ortalamaya girer", () => {
    expect(kanalHizAgiOrtalamaDebi.compute({ ...g, v5: 0, v6: 0 }).intermediates.nokta_sayisi).toBe(4);
  });
});
