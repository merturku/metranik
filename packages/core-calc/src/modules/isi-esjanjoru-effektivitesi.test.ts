import { describe, it, expect } from "vitest";
import { isiEsjanjoreEffektivitesi } from "./isi-esjanjoru-effektivitesi";

describe("Isı Eşanjörü Effektivitesi", () => {
  it("Sıcak 80→70 °C, soğuk 20→65 °C: Cmin soğuk taraf, ε = 45/60 = 0,75 ≥ 0,70 → uygun", () => {
    const r = isiEsjanjoreEffektivitesi.compute({
      sicaklik_giris_sicak_C: 80,
      sicaklik_giris_soğuk_C: 20,
      sicaklik_cikis_sicak_C: 70,
      sicaklik_cikis_soğuk_C: 65,
      min_effektivite: 0.7,
    });

    expect(r.value.effektivite).toBeCloseTo(0.75, 3);
    expect(r.value.isi_farki_teorik_C).toBe(60);
    expect(r.value.isi_farki_fiili_C).toBe(45);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Sıcak 80→75 °C, soğuk 20→30 °C: ε = 10/60 = 0,167 < 0,70 → uygunsuz", () => {
    const r = isiEsjanjoreEffektivitesi.compute({
      sicaklik_giris_sicak_C: 80,
      sicaklik_giris_soğuk_C: 20,
      sicaklik_cikis_sicak_C: 75,
      sicaklik_cikis_soğuk_C: 30,
      min_effektivite: 0.7,
    });

    expect(r.value.effektivite).toBeCloseTo(0.1667, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Cmin sıcak taraf: sıcak 90→50 °C, soğuk 30→40 °C → ε = 40/60 = 0,667", () => {
    const r = isiEsjanjoreEffektivitesi.compute({
      sicaklik_giris_sicak_C: 90,
      sicaklik_giris_soğuk_C: 30,
      sicaklik_cikis_sicak_C: 50,
      sicaklik_cikis_soğuk_C: 40,
      min_effektivite: 0.6,
    });

    expect(r.value.effektivite).toBeCloseTo(0.6667, 3);
    expect(r.value.isi_farki_fiili_C).toBe(40);
    expect(r.verdict?.status).toBe("uygun");
  });
});
