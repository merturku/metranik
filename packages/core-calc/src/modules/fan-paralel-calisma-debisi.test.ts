import { describe, it, expect } from "vitest";
import { fanParalelCalismaDebisi } from "./fan-paralel-calisma-debisi";

describe("Fan Paralel Çalışma", () => {
  const g = { A_Pa: 1000, B_Pa_per_m3s: 0, C_Pa_per_m3s2: -2000, sistemK_Pa_per_m3s2: 500, fanAdedi: 2 };
  it("A=1000, C=−2000, k=500: tek fan q=√0,4=0,6325; iki fan Q=1,0 m³/s, ΔP=500 Pa", () => {
    const r = fanParalelCalismaDebisi.compute(g);
    expect(r.intermediates.tek_fan_debisi_m3s as number).toBeCloseTo(Math.sqrt(0.4), 8);
    expect(r.value.toplamDebi_m3s as number).toBeCloseTo(1.0, 8);
    expect(r.intermediates.sistem_basinci_Pa as number).toBeCloseTo(500, 6);
    expect(r.intermediates.fan_egrisi_kontrol_Pa as number).toBeCloseTo(500, 6);
    expect(r.intermediates.debi_artis_orani as number).toBeCloseTo(1.5811, 3);
  });
  it("tek fanda toplam debi = tek fan debisi", () => {
    const r = fanParalelCalismaDebisi.compute({ ...g, fanAdedi: 1 });
    expect(r.value.toplamDebi_m3s as number).toBeCloseTo(Math.sqrt(0.4), 8);
  });
  it("B ≠ 0 için hem fan hem sistem eğrisi sağlanır", () => {
    const r = fanParalelCalismaDebisi.compute({ ...g, B_Pa_per_m3s: 300, fanAdedi: 3 });
    const q = r.intermediates.fan_basina_debi_m3s as number;
    expect(1000 + 300 * q - 2000 * q * q).toBeCloseTo(500 * (3 * q) ** 2, 6);
  });
});
