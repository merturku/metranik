import { describe, it, expect } from "vitest";
import { sesYalitimiKutleYasasi } from "./ses-yalitimi-kutle-yasasi";

describe("Duvar Hava Ses Yalıtımı (Kütle Yasası)", () => {
  it("200 mm, 2400 kg/m³ (m = 480 kg/m²), 500 Hz → 20·log10(240000) − 47 = 60,60 dB", () => {
    const r = sesYalitimiKutleYasasi.compute({ kalinlik_mm: 200, yogunluk_kgm3: 2400, frekans_Hz: 500, hedefTL_dB: 50 });
    expect(r.value.ses_yalitimi_dB).toBeCloseTo(60.604, 2);
    expect(r.intermediates.yuzey_kutlesi_kgm2).toBe(480);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("hedef 50 dB için 500 Hz'de gerekli kütle 10^4,85/500 = 141,6 kg/m²", () => {
    const r = sesYalitimiKutleYasasi.compute({ kalinlik_mm: 100, yogunluk_kgm3: 1400, frekans_Hz: 500, hedefTL_dB: 50 });
    expect(r.intermediates.hedef_icin_gerekli_kutle_kgm2 as number).toBeCloseTo(141.589, 2);
  });
  it("kütle iki katına → +6,02 dB; hedefin 3 dB altı sınırda, daha altı uygunsuz", () => {
    const g = { kalinlik_mm: 100, yogunluk_kgm3: 1400, frekans_Hz: 500 };
    const r = sesYalitimiKutleYasasi.compute({ ...g, hedefTL_dB: 50 });
    expect(r.intermediates.kutle_iki_katinda_TL_dB as number).toBeCloseTo(r.value.ses_yalitimi_dB + 6.0206, 3);
    expect(sesYalitimiKutleYasasi.compute({ ...g, hedefTL_dB: r.value.ses_yalitimi_dB + 2 }).verdict?.status).toBe("sinirda");
    expect(sesYalitimiKutleYasasi.compute({ ...g, hedefTL_dB: r.value.ses_yalitimi_dB + 10 }).verdict?.status).toBe("uygunsuz");
  });
});
