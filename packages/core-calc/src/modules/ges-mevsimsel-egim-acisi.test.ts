import { describe, it, expect } from "vitest";
import { gesMevsimselEgimAcisi } from "./ges-mevsimsel-egim-acisi";

describe("GES Panel Eğim Açısı", () => {
  it("enlem 39°, 21 Haziran (N = 172): δ ≈ +23,45° → β ≈ 15,55°", () => {
    const r = gesMevsimselEgimAcisi.compute({ enlem_derece: 39, yilinGunu: 172 });
    expect(r.intermediates.deklinasyon_derece as number).toBeCloseTo(23.45, 1);
    expect(r.value.egimAcisi_derece).toBeCloseTo(15.55, 1);
  });
  it("21 Aralık (N = 355): δ ≈ −23,45° → β ≈ 62,45°; kış/yaz/denge özetleri", () => {
    const r = gesMevsimselEgimAcisi.compute({ enlem_derece: 39, yilinGunu: 355 });
    expect(r.value.egimAcisi_derece).toBeCloseTo(62.45, 1);
    expect(r.intermediates.kis_gundonumu_egimi_derece as number).toBeCloseTo(62.45, 8);
    expect(r.intermediates.yaz_gundonumu_egimi_derece as number).toBeCloseTo(15.55, 8);
    expect(r.intermediates.denge_gunu_egimi_derece).toBe(39);
  });
  it("güney yarımkürede panel kuzeye bakar; enlem −35°, N = 355 (yaz): β ≈ 11,55°", () => {
    const r = gesMevsimselEgimAcisi.compute({ enlem_derece: -35, yilinGunu: 355 });
    expect(r.intermediates.panel_yonu).toBe("Kuzey (azimut 0°)");
    expect(r.value.egimAcisi_derece).toBeCloseTo(11.55, 1);
  });
});
