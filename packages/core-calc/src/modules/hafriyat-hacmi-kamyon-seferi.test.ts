import { describe, expect, it } from "vitest";
import { hafriyatHacmiKamyonSeferi } from "./hafriyat-hacmi-kamyon-seferi";

describe("hafriyat-hacmi-kamyon-seferi", () => {
  it("Alan=200m², derinlik=2m, gevşeme=1.2, kamyon=10m³ → 48 sefer", () => {
    const r = hafriyatHacmiKamyonSeferi.compute({
      kazilacakAlan_m2: 200,
      kaziDerinligi_m: 2,
      gevsemeFaktoru: 1.2,
      kamyonKapasitesi_m3: 10,
    });

    expect(r.intermediates.bankHacim_m3).toBeCloseTo(400, 5);
    expect(r.intermediates.gevsekHacim_m3).toBeCloseTo(480, 5);
    expect(r.value.kamyonSeferSayisi).toBe(48);
  });
});
