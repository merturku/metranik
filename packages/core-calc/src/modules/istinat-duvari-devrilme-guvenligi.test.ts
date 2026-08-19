import { describe, expect, it } from "vitest";
import { istinatDuvariDevrilmeGuvenligi } from "./istinat-duvari-devrilme-guvenligi";

describe("istinat-duvari-devrilme-guvenligi", () => {
  it("Pa=80kN, H=4m, W=200kN, x=1.5m, gerekli=1.5 → GS≈2.81, uygun", () => {
    const r = istinatDuvariDevrilmeGuvenligi.compute({
      aktifToprakBasinciKuvveti_Pa_kN: 80,
      duvarYuksekligi_H_m: 4,
      duvarAgirligi_W_kN: 200,
      agirlikMerkeziMesafesi_x_m: 1.5,
      gerekliGuvenlikKatsayisi: 1.5,
    });

    expect(r.intermediates.deviriciMoment_kNm).toBeCloseTo(106.67, 1);
    expect(r.intermediates.direncMomenti_kNm).toBeCloseTo(300, 5);
    expect(r.value.guvenlikKatsayisi_GS).toBeCloseTo(2.8125, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("yetersiz ağırlık/kısa moment kolunda uygunsuz", () => {
    const r = istinatDuvariDevrilmeGuvenligi.compute({
      aktifToprakBasinciKuvveti_Pa_kN: 200,
      duvarYuksekligi_H_m: 4,
      duvarAgirligi_W_kN: 100,
      agirlikMerkeziMesafesi_x_m: 1,
      gerekliGuvenlikKatsayisi: 1.5,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
