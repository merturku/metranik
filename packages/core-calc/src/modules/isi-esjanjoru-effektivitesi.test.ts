import { describe, it, expect } from "vitest";
import { isiEsjanjoreEffektivitesi } from "./isi-esjanjoru-effektivitesi";

describe("Isı Eşanjörü Effektivitesi", () => {
  it("EN 12815: Sicak 80°C, Soğuk giriş 20°C → çıkış 65°C, ε=(65-20)/(80-20)=0.75, uygun", () => {
    const r = isiEsjanjoreEffektivitesi.compute({
      sicaklik_giris_sicak_C: 80,
      sicaklik_giris_soğuk_C: 20,
      sicaklik_cikis_sicak_C: 70,
      sicaklik_cikis_soğuk_C: 65,
      min_effektivite: 0.7,
    });

    expect(r.value.effektivite).toBeCloseTo(0.75, 2);
    expect(r.value.isi_farki_teorik_C).toBe(60);
    expect(r.value.isi_farki_fiili_C).toBe(45);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("Yetersiz effektivite: 80°C sicak, 20°C soğuk giriş → 30°C çıkış, ε=0.167 < 0.7", () => {
    const r = isiEsjanjoreEffektivitesi.compute({
      sicaklik_giris_sicak_C: 80,
      sicaklik_giris_soğuk_C: 20,
      sicaklik_cikis_sicak_C: 75,
      sicaklik_cikis_soğuk_C: 30,
      min_effektivite: 0.7,
    });

    expect(r.value.effektivite).toBeCloseTo(0.167, 2);
    expect(r.value.verdict?.status).toBe("yetersiz");
  });
});
