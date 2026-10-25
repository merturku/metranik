import { describe, it, expect } from "vitest";
import {
  betonOlgunlukKalipAlmaSuresi,
  betonOlgunlukKalipAlmaSuresiInputSchema,
} from "./beton-olgunluk-kalip-alma-suresi";

describe("Beton Olgunluk Yöntemi ile Kalıp Alma Süresi (ASTM C1074, Nurse-Saul)", () => {
  it("20 °C'de 3 günde ulaşılan dayanım, şantiye 10 °C, T0 = 0 °C: M = 20×72 = 1440 °C·saat, t = 3×20/10 = 6 gün", () => {
    const r = betonOlgunlukKalipAlmaSuresi.compute({
      referansSicaklik_Tref_C: 20,
      referansSure_tref_gun: 3,
      santiyeOrtalamaSicaklik_C: 10,
      datumSicakligi_T0_C: 0,
    });
    expect(r.intermediates.hedef_olgunluk_M_Csaat).toBeCloseTo(1440, 6);
    expect(r.value.gerekliSure_gun).toBeCloseTo(6, 6);
    expect(r.intermediates.gerekli_sure_saat).toBeCloseTo(144, 6);
  });

  it("Aynı durum T0 = −10 °C ile: M = 2160 °C·saat, t = 3×30/20 = 4,5 gün", () => {
    const r = betonOlgunlukKalipAlmaSuresi.compute({
      referansSicaklik_Tref_C: 20,
      referansSure_tref_gun: 3,
      santiyeOrtalamaSicaklik_C: 10,
      datumSicakligi_T0_C: -10,
    });
    expect(r.intermediates.hedef_olgunluk_M_Csaat).toBeCloseTo(2160, 6);
    expect(r.value.gerekliSure_gun).toBeCloseTo(4.5, 6);
  });

  it("Şantiye sıcaklığı datum sıcaklığında veya altındaysa girdi reddedilir", () => {
    const sonuc = betonOlgunlukKalipAlmaSuresiInputSchema.safeParse({
      referansSicaklik_Tref_C: 20,
      referansSure_tref_gun: 3,
      santiyeOrtalamaSicaklik_C: 0,
      datumSicakligi_T0_C: 0,
    });
    expect(sonuc.success).toBe(false);
  });
});
