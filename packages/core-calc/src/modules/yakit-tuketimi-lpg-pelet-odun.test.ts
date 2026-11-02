import { describe, it, expect } from "vitest";
import { yakitTuketimiLpgPeletOdun } from "./yakit-tuketimi-lpg-pelet-odun";

describe("Yakıt Tüketimi (LPG/Pelet/Odun)", () => {
  it("15 000 kWh, pelet 4,6 kWh/kg, η 0,85 → 3836,3 kg → 15 kg'lık 256 torba", () => {
    const r = yakitTuketimiLpgPeletOdun.compute({ yillikIsiIhtiyaci_kWh: 15000, yakitTuru: "pelet", sistemVerimi: 0.85, yakitFiyati_TLkg: 10, paketAgirligi_kg: 15 });
    expect(r.value.yakitMiktari_kg).toBeCloseTo(3836.3, 1);
    expect(r.intermediates.paket_sayisi).toBe(256);
    expect(r.intermediates.birim_isi_maliyeti_TLkWh as number).toBeCloseTo(10 / (4.6 * 0.85), 6);
  });
  it("LPG: 12 kg tüp, aynı ısı için daha az kütle", () => {
    const lpg = yakitTuketimiLpgPeletOdun.compute({ yillikIsiIhtiyaci_kWh: 15000, yakitTuru: "lpg", sistemVerimi: 0.9, yakitFiyati_TLkg: 1, paketAgirligi_kg: 12 });
    expect(lpg.value.yakitMiktari_kg).toBeCloseTo(15000 / (12.8 * 0.9), 6);
  });
});
