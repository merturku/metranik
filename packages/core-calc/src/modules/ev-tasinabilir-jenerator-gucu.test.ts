import { describe, it, expect } from "vitest";
import { evTasinabilirJeneratorGucu } from "./ev-tasinabilir-jenerator-gucu";

describe("Ev Taşınabilir Jeneratör Gücü", () => {
  it("3000 W çalışma (800 W motor, k = 3): tepe 4600 W; %20 yedek → 5520 W; cosφ 0,8 → 6,9 kVA", () => {
    const r = evTasinabilirJeneratorGucu.compute({ calismaGucuToplami_W: 3000, enBuyukMotorGucu_W: 800, kalkisKatsayisi: 3, yedekPayi_yuzde: 20, cosPhi: 0.8 });
    expect(r.intermediates.kalkis_anindaki_tepe_yuk_W).toBe(4600);
    expect(r.value.gerekliGuc_W).toBeCloseTo(5520, 8);
    expect(r.intermediates.gerekli_kVA as number).toBeCloseTo(6.9, 8);
  });
  it("k = 1 (kalkış fazlası yok): tepe = çalışma toplamı", () => {
    const r = evTasinabilirJeneratorGucu.compute({ calismaGucuToplami_W: 2000, enBuyukMotorGucu_W: 500, kalkisKatsayisi: 1, yedekPayi_yuzde: 0, cosPhi: 1 });
    expect(r.value.gerekliGuc_W).toBe(2000);
  });
});
