import { describe, expect, it } from "vitest";
import { susturucuUzunlugu } from "./susturucu-uzunlugu";

describe("susturucu-uzunlugu", () => {
  it("Gerekli azaltım=20dB, birim azaltım=4dB/m → 5m", () => {
    const r = susturucuUzunlugu.compute({
      gerekliSesAzaltimi_dB: 20,
      birimAzaltim_dBm: 4,
    });

    expect(r.value.gerekliUzunluk_m).toBeCloseTo(5, 5);
  });
});
