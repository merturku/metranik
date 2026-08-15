import { describe, expect, it } from "vitest";
import { yanginSondurmeGaziMiktari } from "./yangin-sondurme-gazi-miktari";

describe("yangin-sondurme-gazi-miktari", () => {
  it("V=150m³, s=0.15m³/kg, C=%10 → 111.11 kg ajan", () => {
    const r = yanginSondurmeGaziMiktari.compute({
      korunanHacim_V_m3: 150,
      ozgulBuharHacmi_s_m3kg: 0.15,
      tasarimKonsantrasyonu_C_yuzde: 10,
    });

    expect(r.intermediates.hacimSelBuharOrani_kg).toBeCloseTo(1000, 5);
    expect(r.value.gerekliAjanMiktari_kg).toBeCloseTo(111.11, 1);
  });
});
