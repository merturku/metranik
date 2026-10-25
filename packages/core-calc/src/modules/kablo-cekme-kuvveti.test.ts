import { describe, it, expect } from "vitest";
import { kabloCekmeKuvveti, kabloCekmeKuvvetiInputSchema } from "./kablo-cekme-kuvveti";

// 3 kg/m kablo, μ = 0,4, 50 m düz + 90° dirsek (R = 1 m) + 20 m düz; 3 × 95 mm² Cu, 50 N/mm².
const guzergah = {
  kabloBirimAgirligi_kgm: 3,
  surtunmeKatsayisi_mu: 0.4,
  duzBolum1_m: 50,
  dirsekAcisi_derece: 90,
  dirsekYaricapi_m: 1,
  duzBolum2_m: 20,
  toplamIletkenKesiti_mm2: 285,
  izinVerilenGerilme_Nmm2: 50,
};

describe("Kablo Çekme Kuvveti (Kapstan Denklemi)", () => {
  it("İleri: 0,4×29,42×50 = 588,4 N → ×e^(0,4·π/2) = ×1,8745 → 1102,9 N → +235,4 = 1338,3 N", () => {
    const r = kabloCekmeKuvveti.compute(guzergah);
    expect(r.intermediates.kapstan_katsayisi).toBeCloseTo(1.874456, 6);
    expect(r.intermediates.ileri_yonde_cekme_kuvveti_N).toBeCloseTo(1338.288, 2);
  });

  it("Geri: 235,4 → 441,2 → +588,4 = 1029,6 N daha düşük → seçilen; yan duvar basıncı 441,2 N/m; 14 250 N sınırının altında → uygun", () => {
    const r = kabloCekmeKuvveti.compute(guzergah);
    expect(r.intermediates.geri_yonde_cekme_kuvveti_N).toBeCloseTo(1029.570, 2);
    expect(r.value.enKucukCekmeKuvveti_N).toBeCloseTo(1029.570, 2);
    expect(r.intermediates.dirsek_yan_duvar_basinci_Nm).toBeCloseTo(441.171, 2);
    expect(r.intermediates.izin_verilen_cekme_kuvveti_N).toBe(14250);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Dirseksiz düz hatta kuvvet yönden bağımsız: μ·W·(L1 + L2) = 0,4 × 29,42 × 70 = 823,8 N", () => {
    const r = kabloCekmeKuvveti.compute({ ...guzergah, dirsekAcisi_derece: 0 });
    expect(r.value.enKucukCekmeKuvveti_N).toBeCloseTo(0.4 * 3 * 9.80665 * 70, 6);
  });

  it("Uzun güzergâh 400 m + 180° + 400 m küçük kesitte sınırı aşar → uygunsuz", () => {
    const r = kabloCekmeKuvveti.compute({ ...guzergah, duzBolum1_m: 400, duzBolum2_m: 400, dirsekAcisi_derece: 180, toplamIletkenKesiti_mm2: 75 });
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(kabloCekmeKuvvetiInputSchema.safeParse({ ...guzergah, surtunmeKatsayisi_mu: 0 }).success).toBe(false);
  });
});
