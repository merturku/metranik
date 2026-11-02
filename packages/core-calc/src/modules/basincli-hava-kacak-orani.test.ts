import { describe, it, expect } from "vitest";
import { basincliHavaKacakOrani } from "./basincli-hava-kacak-orani";

describe("Basınçlı Hava Kaçak Oranı", () => {
  const o = { yukSuresi_s: 12, bostaSuresi_s: 48, kompresorFAD_m3min: 10, ozgulGuc_kWm3min: 6.5, yillikSaat: 6000, elektrikFiyati_TLkWh: 3 };
  it("12 s yük / 48 s boşta → %20; 2 m³/min; 13 kW; 78 000 kWh; 234 000 ₺ → sınırda", () => {
    const r = basincliHavaKacakOrani.compute(o);
    expect(r.value.kacakOrani_yuzde).toBeCloseTo(20, 9);
    expect(r.intermediates.kacak_debisi_m3min as number).toBeCloseTo(2, 9);
    expect(r.intermediates.kayip_guc_kW as number).toBeCloseTo(13, 9);
    expect(r.intermediates.yillik_kayip_maliyet_TL as number).toBeCloseTo(234000, 3);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("%8 → uygun; %33 → uygunsuz", () => {
    expect(basincliHavaKacakOrani.compute({ ...o, yukSuresi_s: 8, bostaSuresi_s: 92 }).verdict?.status).toBe("uygun");
    expect(basincliHavaKacakOrani.compute({ ...o, yukSuresi_s: 20, bostaSuresi_s: 40 }).verdict?.status).toBe("uygunsuz");
  });
});
