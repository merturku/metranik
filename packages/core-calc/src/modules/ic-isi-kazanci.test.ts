import { describe, it, expect } from "vitest";
import { icIsiKazanci } from "./ic-isi-kazanci";

describe("Mahal İç Isı Kazancı", () => {
  it("10 kişi (75/55 W) + 800 W aydınlatma ×1,2 + 2000 W ekipman ×0,7 = 750+960+1400 duyulur, +550 gizli", () => {
    const r = icIsiKazanci.compute({
      kisiSayisi: 10, kisiDuyulur_W: 75, kisiGizli_W: 55, aydinlatmaGucu_W: 800, aydinlatmaBalastFaktoru: 1.2,
      ekipmanGucu_W: 2000, ekipmanKullanimFaktoru: 0.7,
    });
    expect(r.intermediates.toplam_duyulur_W).toBeCloseTo(3110, 9);
    expect(r.value.toplam_W).toBeCloseTo(3660, 9);
    expect(r.intermediates.duyulur_isi_orani as number).toBeCloseTo(3110 / 3660, 9);
  });
});
