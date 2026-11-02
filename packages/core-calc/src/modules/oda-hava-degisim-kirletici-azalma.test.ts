import { describe, it, expect } from "vitest";
import { odaHavaDegisimKirleticiAzalma } from "./oda-hava-degisim-kirletici-azalma";

describe("Oda Havalandırma Süresi", () => {
  it("50 m³, 100 m³/h (2 ACH), 1500→800 ppm, dış 400: ln(1100/400)/2 h ≈ 30,35 dk", () => {
    const r = odaHavaDegisimKirleticiAzalma.compute({
      odaHacmi_m3: 50, tazeHavaDebisi_m3h: 100, baslangicDerisimi_ppm: 1500, disHavaDerisimi_ppm: 400, hedefDerisim_ppm: 800,
    });
    expect(r.intermediates.hava_degisim_sayisi_ACH).toBeCloseTo(2, 9);
    expect(r.value.sure_dk).toBeCloseTo(30.35, 1);
  });
  it("hedef dış hava derişiminin altındaysa şema reddeder", () => {
    const s = odaHavaDegisimKirleticiAzalma.inputSchema.safeParse({
      odaHacmi_m3: 50, tazeHavaDebisi_m3h: 100, baslangicDerisimi_ppm: 1500, disHavaDerisimi_ppm: 400, hedefDerisim_ppm: 300,
    });
    expect(s.success).toBe(false);
  });
});
