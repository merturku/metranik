import { describe, it, expect } from "vitest";
import { evCatiPanelSayisi } from "./ev-cati-panel-sayisi";

describe("Çatıya Sığan GES Panel Sayısı", () => {
  it("40 m², kullanım %70, panel 1,134 × 1,722 m (1,953 m²), 450 W: 28/1,953 = 14,34 → 14 panel, 6,3 kWp", () => {
    const r = evCatiPanelSayisi.compute({ catiAlani_m2: 40, kullanimOrani: 0.7, panelBoyu_m: 1.722, panelEni_m: 1.134, panelGucu_W: 450 });
    expect(r.intermediates.panel_alani_m2 as number).toBeCloseTo(1.9527, 3);
    expect(r.value.panelSayisi).toBe(14);
    expect(r.intermediates.kurulu_guc_kWp as number).toBeCloseTo(6.3, 8);
    expect(r.intermediates.panel_yuzey_verimi_Wm2 as number).toBeCloseTo(230.4, 0);
  });
  it("tam sığma sınırında yuvarlama hatası yok (10 m², 1 m² panel → 10)", () => {
    expect(evCatiPanelSayisi.compute({ catiAlani_m2: 10, kullanimOrani: 1, panelBoyu_m: 1, panelEni_m: 1, panelGucu_W: 300 }).value.panelSayisi).toBe(10);
  });
});
