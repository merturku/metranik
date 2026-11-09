import { describe, it, expect } from "vitest";
import { havaIsiticiBataryaSuDebisi } from "./hava-isitici-batarya-su-debisi";

describe("Hava Isıtıcı Batarya", () => {
  it("5000 m³/h, ΔT = 20 K: Q = 1,3889·1,206·20 = 33,5 kW; 80/60 °C: ṁ = 0,4001 kg/s = 1,4405 m³/h", () => {
    const r = havaIsiticiBataryaSuDebisi.compute({ havaDebisi_m3h: 5000, havaSicaklikArtisi_K: 20, suGidis_C: 80, suDonus_C: 60 });
    expect(r.value.isitmaKapasitesi_kW).toBeCloseTo(33.5, 6);
    expect(r.intermediates.su_kutle_debisi_kgs as number).toBeCloseTo(0.40014, 4);
    expect(r.intermediates.su_debisi_m3h as number).toBeCloseTo(1.4405, 3);
  });
  it("su ΔT yarıya → su debisi iki katı; ΔT ≤ 0 uygunsuz", () => {
    const a = havaIsiticiBataryaSuDebisi.compute({ havaDebisi_m3h: 5000, havaSicaklikArtisi_K: 20, suGidis_C: 80, suDonus_C: 70 }).intermediates.su_debisi_m3h as number;
    expect(a).toBeCloseTo(2 * 1.4405, 3);
    expect(havaIsiticiBataryaSuDebisi.compute({ havaDebisi_m3h: 5000, havaSicaklikArtisi_K: 20, suGidis_C: 60, suDonus_C: 60 }).verdict?.status).toBe("uygunsuz");
  });
});
