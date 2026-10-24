import { describe, it, expect } from "vitest";
import { sogutmaDolumProsedureKontrolSuresi } from "./sogutma-dolum-proseduru-kontrol-suresi";

describe("Soğutma Dolum Prosedürü Kontrol Süresi", () => {
  it("500 L sistem, 10 L/dk dolum → 50 dk dolum + 5 + 10 = 65 dk toplam", () => {
    const r = sogutmaDolumProsedureKontrolSuresi.compute({
      sistem_hacmi_L: 500,
      dolum_debisi_Lmin: 10,
      basinc_stabilizasyon_dakika: 5,
      sicaklik_stabilizasyon_dakika: 10,
    });

    expect(r.value.dolum_suresi_dakika).toBe(50);
    expect(r.value.total_kontrol_suresi_dakika).toBe(65);
  });

  it("200 L sistem, 20 L/dk dolum → 10 dk dolum + 5 + 10 = 25 dk toplam", () => {
    const r = sogutmaDolumProsedureKontrolSuresi.compute({
      sistem_hacmi_L: 200,
      dolum_debisi_Lmin: 20,
      basinc_stabilizasyon_dakika: 5,
      sicaklik_stabilizasyon_dakika: 10,
    });

    expect(r.value.dolum_suresi_dakika).toBe(10);
    expect(r.value.total_kontrol_suresi_dakika).toBe(25);
  });
});
