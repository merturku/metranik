import { describe, it, expect } from "vitest";
import { evOdaIsinmaSuresiElektrikli } from "./ev-oda-isinma-suresi-elektrikli";

const g = { isilKapasite_MJK: 2, isiKaybiKatsayisi_UA_WK: 100, isitaciGucu_W: 3000, disSicaklik_C: 0, baslangicSicakligi_C: 10, hedefSicaklik_C: 20 };

describe("Oda Isınma Süresi (Elektrikli)", () => {
  it("C = 2 MJ/K, UA = 100 W/K, P = 3 kW, Te = 0: T∞ = 30; τ = 5,56 h; t = τ·ln(20/10) = 3,851 h", () => {
    const r = evOdaIsinmaSuresiElektrikli.compute(g);
    expect(r.intermediates.kararli_sicaklik_C).toBe(30);
    expect(r.intermediates.zaman_sabiti_saat as number).toBeCloseTo(5.5556, 3);
    expect(r.value.isinmaSuresi_saat as number).toBeCloseTo(3.8508, 3);
    expect(r.intermediates.gerekli_surekli_guc_W).toBe(2000);
  });
  it("hedef kararlı sıcaklığın üstündeyse null + uygunsuz; hedef başlangıçtan düşükse süre 0", () => {
    const y = evOdaIsinmaSuresiElektrikli.compute({ ...g, hedefSicaklik_C: 35 });
    expect(y.value.isinmaSuresi_saat).toBeNull();
    expect(y.verdict?.status).toBe("uygunsuz");
    expect(evOdaIsinmaSuresiElektrikli.compute({ ...g, hedefSicaklik_C: 8 }).value.isinmaSuresi_saat).toBe(0);
  });
  it("güç artırınca süre kısalır", () => {
    expect(evOdaIsinmaSuresiElektrikli.compute({ ...g, isitaciGucu_W: 6000 }).value.isinmaSuresi_saat as number).toBeLessThan(3.8508);
  });
});
