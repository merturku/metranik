import { describe, it, expect } from "vitest";
import { tazeHavaOraniSicakliktan } from "./taze-hava-orani-sicakliktan";

const g = { donusHavasiSicakligi_C: 24, disHavaSicakligi_C: 32, karisimSicakligi_C: 26, toplamDebi_m3h: 10000, gerekliTazeHava_m3h: 2000 };

describe("Taze Hava Oranı (Sıcaklık Yöntemi)", () => {
  it("dönüş 24, dış 32, karışım 26 °C → x = 2/8 = %25; 2500 m³/h ≥ 2000 → uygun", () => {
    const r = tazeHavaOraniSicakliktan.compute(g);
    expect(r.value.tazeHavaOrani_yuzde as number).toBeCloseTo(25, 8);
    expect(r.intermediates.taze_hava_debisi_m3h as number).toBeCloseTo(2500, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("karışım 25 → %12,5 → 1250 m³/h < gerekli → uygunsuz; 25,7 → %21,25 → 2125 → uygun", () => {
    expect(tazeHavaOraniSicakliktan.compute({ ...g, karisimSicakligi_C: 25 }).verdict?.status).toBe("uygunsuz");
    expect(tazeHavaOraniSicakliktan.compute({ ...g, karisimSicakligi_C: 25.7 }).verdict?.status).toBe("uygun");
  });
  it("dış–dönüş farkı < 5 K → null; karışım dış sıcaklıktan yüksekse geçersiz oran uygunsuz", () => {
    expect(tazeHavaOraniSicakliktan.compute({ ...g, disHavaSicakligi_C: 27 }).value.tazeHavaOrani_yuzde).toBeNull();
    expect(tazeHavaOraniSicakliktan.compute({ ...g, karisimSicakligi_C: 35 }).verdict?.status).toBe("uygunsuz");
  });
});
