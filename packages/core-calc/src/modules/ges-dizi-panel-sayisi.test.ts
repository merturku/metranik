import { describe, it, expect } from "vitest";
import { gesDiziPanelSayisi, gesDiziPanelSayisiInputSchema } from "./ges-dizi-panel-sayisi";

// Tipik 144 hücreli panel: Voc 49,5 V, Vmp 41,7 V, βVoc −0,27 %/K, βVmp −0,35 %/K;
// hücre −10…70 °C; invertör 1000 V DC, MPPT 200–850 V.
const dizi = {
  panelVoc_V: 49.5,
  panelVmp_V: 41.7,
  vocSicaklikKatsayisi_yuzdeK: -0.27,
  vmpSicaklikKatsayisi_yuzdeK: -0.35,
  enDusukHucreSicakligi_C: -10,
  enYuksekHucreSicakligi_C: 70,
  invertorMaksDcGerilimi_V: 1000,
  mpptMinGerilimi_V: 200,
  mpptMaksGerilimi_V: 850,
  dizidekiPanelSayisi: 18,
};

describe("GES Dizi (String) Panel Sayısı", () => {
  it("Voc(−10 °C) = 49,5×(1 + 0,0027×35) = 54,178 V → Nmaks = ⌊1000/54,178⌋ = 18; Vmp(70 °C) = 35,132 V → Nmin = 6; Vmp(−10 °C) = 46,808 V → MPPT üstü 18", () => {
    const r = gesDiziPanelSayisi.compute(dizi);
    expect(r.intermediates.panel_voc_en_dusuk_sicaklikta_V).toBeCloseTo(54.17775, 6);
    expect(r.value.maksPanelSayisi).toBe(18);
    expect(r.intermediates.panel_vmp_en_yuksek_sicaklikta_V).toBeCloseTo(35.13225, 6);
    expect(r.intermediates.min_panel_sayisi_mppt).toBe(6);
    expect(r.intermediates.panel_vmp_en_dusuk_sicaklikta_V).toBeCloseTo(46.80825, 6);
    expect(r.intermediates.maks_panel_sayisi_mppt).toBe(18);
  });

  it("18 panel: dizi Voc 975,2 V, Vmp 632,4–842,5 V → uygun", () => {
    const r = gesDiziPanelSayisi.compute(dizi);
    expect(r.intermediates.dizi_voc_en_dusuk_sicaklikta_V).toBeCloseTo(975.1995, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("19 panel: 1029,4 V > 1000 V → uygunsuz; 5 panel: 175,7 V < 200 V → uygunsuz", () => {
    expect(gesDiziPanelSayisi.compute({ ...dizi, dizidekiPanelSayisi: 19 }).verdict?.status).toBe("uygunsuz");
    const az = gesDiziPanelSayisi.compute({ ...dizi, dizidekiPanelSayisi: 5 });
    expect(az.intermediates.dizi_vmp_en_yuksek_sicaklikta_V).toBeCloseTo(175.66125, 5);
    expect(az.verdict?.status).toBe("uygunsuz");
  });

  it("MPPT üst sınırı 800 V iken 18 panel güvenli ama soğukta MPPT dışı → sınırda", () => {
    expect(gesDiziPanelSayisi.compute({ ...dizi, mpptMaksGerilimi_V: 800 }).verdict?.status).toBe("sinirda");
  });

  it("Pozitif gerilim sıcaklık katsayısı ve Vmp ≥ Voc reddedilir", () => {
    expect(gesDiziPanelSayisiInputSchema.safeParse({ ...dizi, vocSicaklikKatsayisi_yuzdeK: 0.3 }).success).toBe(false);
    expect(gesDiziPanelSayisiInputSchema.safeParse({ ...dizi, panelVmp_V: 50 }).success).toBe(false);
  });
});
