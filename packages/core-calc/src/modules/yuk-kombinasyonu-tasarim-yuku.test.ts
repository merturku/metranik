import { describe, it, expect } from "vitest";
import { yukKombinasyonuTasarimYuku } from "./yuk-kombinasyonu-tasarim-yuku";

describe("Düşey Yük Kombinasyonu", () => {
  it("G 20, Q 10: TS 500 = 44, EN 1990 = 42, servis 30", () => {
    const r = yukKombinasyonuTasarimYuku.compute({ oluYuk: 20, hareketliYuk: 10 });
    expect(r.value.Fd_TS500).toBeCloseTo(44, 9);
    expect(r.intermediates.Fd_EN1990_610).toBeCloseTo(42, 9);
    expect(r.intermediates.servis_G_Q).toBe(30);
    expect(r.intermediates.TS500_servis_orani as number).toBeCloseTo(44 / 30, 9);
  });
  it("sıfır yük hata vermez", () => {
    expect(yukKombinasyonuTasarimYuku.compute({ oluYuk: 0, hareketliYuk: 0 }).value.Fd_TS500).toBe(0);
  });
});
