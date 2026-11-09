import { describe, it, expect } from "vitest";
import { yogusmaliKazanYogusmaSuyu } from "./yogusmali-kazan-yogusma-suyu";

describe("Yoğuşmalı Kazan Yoğuşma Suyu", () => {
  it("teorik metan: 2·18,015/22,414 = 1,6075 kg/Nm³", () => {
    const r = yogusmaliKazanYogusmaSuyu.compute({ yakitDebisi_Nm3h: 100, birimSuUretimi_kgNm3: 1.6075, yogusanKesir: 0.4 });
    expect(r.intermediates.teorik_metan_birim_su_kgNm3 as number).toBeCloseTo(1.6075, 3);
  });
  it("100 Nm³/h, f = 0,4: toplam 160,75 kg/h; yoğuşan 64,3 kg/h; gizli ısı = 64,3·2442/3600 = 43,6 kW", () => {
    const r = yogusmaliKazanYogusmaSuyu.compute({ yakitDebisi_Nm3h: 100, birimSuUretimi_kgNm3: 1.6075, yogusanKesir: 0.4 });
    expect(r.intermediates.yanma_suyu_toplam_kgh as number).toBeCloseTo(160.75, 6);
    expect(r.value.yogusmaSuyu_kgh).toBeCloseTo(64.3, 6);
    expect(r.intermediates.gizli_isi_geri_kazanimi_kW as number).toBeCloseTo(43.62, 1);
  });
  it("f = 0 → yoğuşma yok; yoğuşan + yoğuşmayan = toplam", () => {
    const r = yogusmaliKazanYogusmaSuyu.compute({ yakitDebisi_Nm3h: 50, birimSuUretimi_kgNm3: 1.6, yogusanKesir: 0 });
    expect(r.value.yogusmaSuyu_kgh).toBe(0);
    const s = yogusmaliKazanYogusmaSuyu.compute({ yakitDebisi_Nm3h: 50, birimSuUretimi_kgNm3: 1.6, yogusanKesir: 0.3 });
    expect(s.value.yogusmaSuyu_kgh + (s.intermediates.yogusmayan_su_kgh as number)).toBeCloseTo(80, 8);
  });
});
