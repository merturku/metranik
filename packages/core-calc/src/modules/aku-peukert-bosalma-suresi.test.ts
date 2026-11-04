import { describe, it, expect } from "vitest";
import { akuPeukertBosalmaSuresi } from "./aku-peukert-bosalma-suresi";

describe("Akü Boşalma Süresi (Peukert)", () => {
  it("k = 1 ideal: 100 Ah / 20 A = 5 saat", () => {
    const r = akuPeukertBosalmaSuresi.compute({ kapasite_Ah: 100, referansSure_h: 20, akim_A: 20, peukertUssu: 1 });
    expect(r.value.bosalmaSuresi_h).toBeCloseTo(5, 6);
  });
  it("100 Ah (20 h), 20 A, k 1,2 → t = 20·0,25^1,2 ≈ 3,789 h; etkin kapasite ≈ 75,8 Ah", () => {
    const r = akuPeukertBosalmaSuresi.compute({ kapasite_Ah: 100, referansSure_h: 20, akim_A: 20, peukertUssu: 1.2 });
    expect(r.value.bosalmaSuresi_h).toBeCloseTo(3.789, 2);
    expect(r.intermediates.etkin_kapasite_Ah as number).toBeCloseTo(75.79, 1);
  });
  it("referans akımda (C/H) kapasite tam kullanılır (k'dan bağımsız)", () => {
    const r = akuPeukertBosalmaSuresi.compute({ kapasite_Ah: 100, referansSure_h: 20, akim_A: 5, peukertUssu: 1.3 });
    expect(r.value.bosalmaSuresi_h).toBeCloseTo(20, 6);
  });
});
