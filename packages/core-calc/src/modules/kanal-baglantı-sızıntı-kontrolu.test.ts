import { describe, it, expect } from "vitest";
import { kanalBaglantıSızıntıKontrolu } from "./kanal-baglantı-sızıntı-kontrolu";

describe("Kanal Bağlantı Sızıntı Kontrolü", () => {
  it("ISO 12237: 1000 m³/h tasarım, 0.1% sızıntı → 1 m³/h, uygun", () => {
    const r = kanalBaglantıSızıntıKontrolu.compute({
      tasarım_debisi_m3h: 1000,
      sızıntı_orani_yuzde: 0.1,
      izin_verilen_sızıntı_yuzde: 0.3,
    });

    expect(r.value.sızıntı_debisi_m3h).toBeCloseTo(1, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("Aşırı sızıntı: 1000 m³/h, 0.5% → 5 m³/h, yetersiz", () => {
    const r = kanalBaglantıSızıntıKontrolu.compute({
      tasarım_debisi_m3h: 1000,
      sızıntı_orani_yuzde: 0.5,
      izin_verilen_sızıntı_yuzde: 0.3,
    });

    expect(r.value.sızıntı_debisi_m3h).toBeCloseTo(5, 0);
    expect(r.value.verdict?.status).toBe("yetersiz");
  });
});
