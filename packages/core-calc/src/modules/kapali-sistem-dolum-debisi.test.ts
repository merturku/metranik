import { describe, it, expect } from "vitest";
import { kapalıSistemDolumDebisi } from "./kapali-sistem-dolum-debisi";

describe("Kapalı Sistem Dolum Debisi", () => {
  it("EN 12828: 100L boiler + 80L radyatör + 20L boru, 0.5 m/h dolum hızı → 100 L/h, 120 dakika", () => {
    const r = kapalıSistemDolumDebisi.compute({
      kazan_hacmi_L: 100,
      radyator_toplam_hacmi_L: 80,
      boru_hacmi_L: 20,
      dolum_hizi_mh: 0.5,
    });

    expect(r.value.gereken_dolum_debisi_Lh).toBeCloseTo(100, 0);
    expect(r.value.dolum_suresi_dakika).toBeCloseTo(120, 0);
  });

  it("Daha küçük sistem: 50L + 30L + 10L = 90L → 45 L/h, 120 dakika", () => {
    const r = kapalıSistemDolumDebisi.compute({
      kazan_hacmi_L: 50,
      radyator_toplam_hacmi_L: 30,
      boru_hacmi_L: 10,
      dolum_hizi_mh: 0.5,
    });

    expect(r.value.gereken_dolum_debisi_Lh).toBeCloseTo(45, 0);
    expect(r.value.dolum_suresi_dakika).toBeCloseTo(120, 0);
  });
});
