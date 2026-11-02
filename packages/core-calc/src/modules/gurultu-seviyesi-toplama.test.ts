import { describe, it, expect } from "vitest";
import { gurultuSeviyesiToplama } from "./gurultu-seviyesi-toplama";

describe("Gürültü Seviyesi Toplama", () => {
  it("üç 50 dB kaynak → 54,77 dB; 1 m → 10 m'de −20 dB = 34,77 dB", () => {
    const r = gurultuSeviyesiToplama.compute({ kaynak1_dB: 50, kaynak2_dB: 50, kaynak3_dB: 50, olcumMesafesi_m: 1, hedefMesafe_m: 10, izinVerilen_dB: 35 });
    expect(r.value.toplamSeviye_dB).toBeCloseTo(54.77, 2);
    expect(r.intermediates.hedef_mesafede_dB as number).toBeCloseTo(34.77, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("iki 60 dB → 63,01 dB (+3 dB kuralı)", () => {
    const r = gurultuSeviyesiToplama.compute({ kaynak1_dB: 60, kaynak2_dB: 60, kaynak3_dB: 0, olcumMesafesi_m: 1, hedefMesafe_m: 1, izinVerilen_dB: 70 });
    expect(r.value.toplamSeviye_dB).toBeCloseTo(63.01, 2);
  });
});
