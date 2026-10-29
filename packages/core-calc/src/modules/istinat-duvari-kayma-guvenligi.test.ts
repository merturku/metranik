import { describe, it, expect } from "vitest";
import { istinatDuvariKaymaGuvenligi } from "./istinat-duvari-kayma-guvenligi";

const ornek = {
  toplamDusey_kNm: 200,
  toplamYatay_kNm: 80,
  tabanSurtunmeAcisi_derece: 25,
  tabanAdhezyonu_kPa: 0,
  tabanGenisligi_m: 3,
  pasifDirenc_kNm: 0,
  gerekliFS: 1.5,
};

describe("İstinat Duvarı Kayma Güvenliği", () => {
  it("200·tan25° = 93,26 kN/m → FS = 1,166 < 1,5 uygunsuz", () => {
    const r = istinatDuvariKaymaGuvenligi.compute(ornek);
    expect(r.intermediates.surtunme_direnci_kNm).toBeCloseTo(93.2615, 3);
    expect(r.value.kaymaGuvenlikSayisi).toBeCloseTo(1.1658, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("ΣV = 300, δ = 30°: 173,21/80 = 2,165 → uygun", () => {
    const r = istinatDuvariKaymaGuvenligi.compute({ ...ornek, toplamDusey_kNm: 300, tabanSurtunmeAcisi_derece: 30 });
    expect(r.value.kaymaGuvenlikSayisi).toBeCloseTo(2.1651, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("adhezyon ve pasif direnç toplanır; gereken ek direnç hesaplanır", () => {
    const r = istinatDuvariKaymaGuvenligi.compute({ ...ornek, tabanAdhezyonu_kPa: 10, pasifDirenc_kNm: 20 });
    expect(r.intermediates.toplam_direnc_kNm).toBeCloseTo(93.2615 + 30 + 20, 3);
    expect(r.intermediates.gereken_ek_direnc_kNm).toBeCloseTo(120 - 143.2615 > 0 ? 120 - 143.2615 : 0, 6);
  });
});
