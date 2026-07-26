import { describe, expect, it } from "vitest";
import { istinatDuvariAktifToprakBasinci } from "./istinat-duvari-aktif-toprak-basinci";

describe("istinatDuvariAktifToprakBasinci", () => {
  it("γ=18 kN/m³, H=4m, φ=30° → Ka≈0.333, Pa≈48 kN/m", () => {
    const r = istinatDuvariAktifToprakBasinci.compute({
      birimHacimAgirlik_gamma_kNm3: 18,
      duvarYuksekligi_H_m: 4,
      icselSurtunmeAcisi_phi_derece: 30,
    });
    expect(r.value.aktifItki_Pa_kNm).toBeCloseTo(48, 1);
    expect(r.intermediates.aktifToprakBasincKatsayisi_Ka).toBeCloseTo(0.3333, 3);
  });
});
