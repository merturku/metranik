import { describe, expect, it } from "vitest";
import { suDeposuHacmiHesabi } from "./su-deposu-hacmi-hesabi";

describe("su-deposu-hacmi-hesabi", () => {
  it("4 kişi, 150 L/kişi/gün, 1 yedek gün → 600 L", () => {
    const r = suDeposuHacmiHesabi.compute({
      kisiSayisi: 4,
      gunlukKisiBasiTuketim_Lgun: 150,
      yedekGunSayisi: 1,
    });

    expect(r.value.gerekliHacim_L).toBeCloseTo(600, 5);
    expect(r.intermediates.gerekliHacim_m3).toBeCloseTo(0.6, 5);
  });
});
