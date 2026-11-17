import { describe, it, expect } from "vitest";
import { akuSarjRedresoruAkimi } from "./aku-sarj-redresoru-akimi";

describe("Akü Şarj Redresörü Akımı", () => {
  it("200 Ah, 10 saat, k 1,1, yük 15 A, 110 V: şarj 22 A; redresör 37 A; 4,07 kW", () => {
    const r = akuSarjRedresoruAkimi.compute({ kapasite_Ah: 200, sarjSuresi_h: 10, yukAkimi_A: 15, k: 1.1, gerilim_V: 110 });
    expect(r.intermediates.sarj_akimi_A as number).toBeCloseTo(22, 10);
    expect(r.value.redresorAkimi_A).toBeCloseTo(37, 10);
    expect(r.intermediates.redresor_gucu_kW as number).toBeCloseTo(4.07, 10);
  });
  it("şarj süresi yarısı → şarj akımı iki katı", () => {
    const a = akuSarjRedresoruAkimi.compute({ kapasite_Ah: 200, sarjSuresi_h: 10, yukAkimi_A: 0, k: 1, gerilim_V: 24 }).value.redresorAkimi_A;
    expect(akuSarjRedresoruAkimi.compute({ kapasite_Ah: 200, sarjSuresi_h: 5, yukAkimi_A: 0, k: 1, gerilim_V: 24 }).value.redresorAkimi_A / a).toBeCloseTo(2, 10);
  });
});
