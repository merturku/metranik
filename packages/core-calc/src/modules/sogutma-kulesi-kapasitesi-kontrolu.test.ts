import { describe, it, expect } from "vitest";
import { sogutmaKulesiKapasitesiKontrolu } from "./sogutma-kulesi-kapasitesi-kontrolu";

describe("Soğutma Kulesi Kapasitesi Kontrolü", () => {
  it("EN 12113: 100 m³/h, 35°C giriş, 28°C çıkış → ΔT=7°C, 814 kW ısı yükü, uygun", () => {
    const r = sogutmaKulesiKapasitesiKontrolu.compute({
      isi_yuku_kW: 800,
      su_debisi_m3h: 100,
      giris_sicakligi_C: 35,
      cikis_sicakligi_C: 28,
      ortam_sicakligi_C: 25,
      min_cikis_sicakligi_C: 28,
    });

    expect(r.value.sicaklik_farki_C).toBe(7);
    expect(r.value.gereken_isi_yuku_kW).toBeCloseTo(814, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("Yetersiz kapasite: 100 m³/h, 35°C→32°C → ΔT=3°C, 349 kW < 800 kW talep, yetersiz", () => {
    const r = sogutmaKulesiKapasitesiKontrolu.compute({
      isi_yuku_kW: 800,
      su_debisi_m3h: 100,
      giris_sicakligi_C: 35,
      cikis_sicakligi_C: 32,
      ortam_sicakligi_C: 25,
      min_cikis_sicakligi_C: 28,
    });

    expect(r.value.sicaklik_farki_C).toBe(3);
    expect(r.value.verdict?.status).toBe("yetersiz");
  });
});
