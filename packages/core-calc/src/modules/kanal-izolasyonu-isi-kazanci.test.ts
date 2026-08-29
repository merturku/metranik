import { describe, expect, it } from "vitest";
import { kanalIzolasyonuIsiKazanci } from "./kanal-izolasyonu-isi-kazanci";

describe("kanal-izolasyonu-isi-kazanci", () => {
  it("P=1.4m, L=10m, t=25mm, k=0.035 W/mK, h=8 W/m²K, T1=13°C, T2=30°C → ~283.6 W kazanç", () => {
    const r = kanalIzolasyonuIsiKazanci.compute({
      kanalCevresi_P_m: 1.4,
      kanalUzunlugu_L_m: 10,
      izolasyonKalinligi_t_m: 0.025,
      izolasyonIsiIletkenligi_k_WmK: 0.035,
      disTasinimKatsayisi_h_Wm2K: 8,
      icSicaklik_T1_C: 13,
      disSicaklik_T2_C: 30,
    });

    expect(r.intermediates.iletimDirenci_m2KW).toBeCloseTo(0.71429, 4);
    expect(r.intermediates.disYuzeyAlani_m2).toBeCloseTo(14, 5);
    expect(r.value.isiGecisi_W).toBeCloseTo(283.57, 1);
  });
});
