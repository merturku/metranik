import { describe, it, expect } from "vitest";
import { pompaIsletmeNoktasi, pompaIsletmeNoktasiInputSchema } from "./pompa-isletme-noktasi";

// Pompa eğrisi H = 40 + 0,05Q − 0,004Q² (m, m³/h) üzerinden üç nokta:
// (0; 40), (50; 32,5), (80; 18,4). Sistem: Hst = 10 m, tasarım (60 m³/h; 28 m) → b = 0,005.
const pompa = {
  kapamaBasmaYuksekligi_H0_m: 40,
  egriNokta2Debi_m3h: 50,
  egriNokta2Basma_m: 32.5,
  egriNokta3Debi_m3h: 80,
  egriNokta3Basma_m: 18.4,
  statikYukseklik_Hst_m: 10,
  tasarimDebisi_Qd_m3h: 60,
  tasarimBasmaYuksekligi_Hd_m: 28,
};

describe("Pompa İşletme Noktası (Pompa–Sistem Eğrisi)", () => {
  it("Üç noktadan eğri katsayıları geri bulunur: B = 0,05, C = −0,004; sistem b = 18/3600 = 0,005", () => {
    const r = pompaIsletmeNoktasi.compute(pompa);
    expect(r.intermediates.pompa_egrisi_B).toBeCloseTo(0.05, 12);
    expect(r.intermediates.pompa_egrisi_C).toBeCloseTo(-0.004, 12);
    expect(r.intermediates.sistem_direnc_katsayisi_b).toBeCloseTo(0.005, 12);
  });

  it("Kesişim 0,009Q² − 0,05Q − 30 = 0 → Q = (0,05 + √1,0825)/0,018 = 60,58 m³/h, H = 28,35 m → uygun; tasarım için r = 0,9927", () => {
    const r = pompaIsletmeNoktasi.compute(pompa);
    expect(r.value.isletmeDebisi_m3h).toBeCloseTo(60.5796, 4);
    expect(r.intermediates.isletme_basma_yuksekligi_m).toBeCloseTo(28.3494, 4);
    expect(r.intermediates.tasarim_icin_devir_orani_r).toBeCloseTo(0.99275, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Tasarım 70 m³/h, 34 m: kesişim ≈ 60,7 m³/h < 70 → uygunsuz, gereken devir oranı > 1", () => {
    const r = pompaIsletmeNoktasi.compute({ ...pompa, tasarimDebisi_Qd_m3h: 70, tasarimBasmaYuksekligi_Hd_m: 34 });
    expect(r.value.isletmeDebisi_m3h as number).toBeLessThan(70);
    expect(r.intermediates.tasarim_icin_devir_orani_r as number).toBeGreaterThan(1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Kesişim eğri verisinin ötesinde (Hst = 0, tasarım 75 m³/h, 12 m → Q ≈ 84,9 > 80) → sınırda", () => {
    const r = pompaIsletmeNoktasi.compute({
      ...pompa,
      statikYukseklik_Hst_m: 0,
      tasarimDebisi_Qd_m3h: 75,
      tasarimBasmaYuksekligi_Hd_m: 12,
    });
    expect(r.value.isletmeDebisi_m3h).toBeCloseTo(84.94, 1);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("Statik yükseklik kapama basıncını aşarsa kesişim yok; eğri noktaları sıralı olmalı", () => {
    const r = pompaIsletmeNoktasi.compute({ ...pompa, statikYukseklik_Hst_m: 45, tasarimBasmaYuksekligi_Hd_m: 50 });
    expect(r.value.isletmeDebisi_m3h).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(pompaIsletmeNoktasiInputSchema.safeParse({ ...pompa, egriNokta3Debi_m3h: 40 }).success).toBe(false);
  });
});
