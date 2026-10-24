import { describe, it, expect } from "vitest";
import { sogutmaKulesiKapasitesiKontrolu } from "./sogutma-kulesi-kapasitesi-kontrolu";

const temel = {
  tasarim_isi_yuku_kW: 800,
  su_debisi_m3h: 100,
  giris_sicakligi_C: 35,
  cikis_sicakligi_C: 28,
  yas_termometre_sicakligi_C: 24,
  tasarim_cikis_sicakligi_C: 28,
};

describe("Soğutma Kulesi Kapasitesi Kontrolü", () => {
  it("100 m³/h, 35→28 °C: ṁ = 27,78 kg/s, Q = 27,78×4,186×7 = 813,9 kW ≥ 800 kW → uygun", () => {
    const r = sogutmaKulesiKapasitesiKontrolu.compute(temel);
    expect(r.intermediates.kutleselDebi_kgs).toBeCloseTo(27.778, 3);
    expect(r.value.atilan_isi_kW).toBeCloseTo(813.94, 1);
    expect(r.intermediates.approach_C).toBe(4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("100 m³/h, 35→32 °C: Q = 348,8 kW < 800 kW → uygunsuz (kapasite yetersiz)", () => {
    const r = sogutmaKulesiKapasitesiKontrolu.compute({ ...temel, cikis_sicakligi_C: 32 });
    expect(r.value.atilan_isi_kW).toBeCloseTo(348.83, 1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("120 m³/h, 35→29 °C: Q = 837,2 kW yükü karşılıyor ama çıkış 29 > 28 °C → sınırda", () => {
    const r = sogutmaKulesiKapasitesiKontrolu.compute({
      ...temel,
      su_debisi_m3h: 120,
      cikis_sicakligi_C: 29,
    });
    expect(r.value.atilan_isi_kW).toBeCloseTo(837.2, 1);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("Çıkış suyu yaş termometrenin altında (28 < 30 °C) → fiziksel olarak imkânsız, uygunsuz", () => {
    const r = sogutmaKulesiKapasitesiKontrolu.compute({ ...temel, yas_termometre_sicakligi_C: 30 });
    expect(r.intermediates.approach_C).toBe(-2);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
