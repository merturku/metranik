import { describe, it, expect } from "vitest";
import { basincliHavaDelikKacakDebisi } from "./basincli-hava-delik-kacak-debisi";

const g = { delikCapi_mm: 3, hatBasinci_barg: 7, cd: 0.8, ozgulEnerji_kWhm3: 0.11, yillikSaat_h: 8000, elektrikFiyati: 4 };

describe("Basınçlı Hava Delik Kaçağı", () => {
  it("3 mm delik, 7 bar-g, Cd 0,8: tıkanmış akış; ṁ = 0,010697 kg/s = 0,5329 m³/dk FAD; 28 139 kWh/yıl", () => {
    const r = basincliHavaDelikKacakDebisi.compute(g);
    expect(r.intermediates.akis_rejimi).toBe("Tıkanmış (sesüstü)");
    expect(r.intermediates.kutlesel_debi_kgs as number).toBeCloseTo(0.010697, 5);
    expect(r.value.kacakDebisi_m3dk).toBeCloseTo(0.53293, 4);
    expect(r.intermediates.yillik_enerji_kWh as number).toBeCloseTo(28138.8, 0);
    expect(r.intermediates.yillik_maliyet as number).toBeCloseTo(112555.3, 0);
  });
  it("alt-kritik: 0,5 bar-g → 0,0019286 kg/s; kritik basınçta iki formül süreklidir", () => {
    const sub = basincliHavaDelikKacakDebisi.compute({ ...g, hatBasinci_barg: 0.5 });
    expect(sub.intermediates.akis_rejimi).toBe("Alt-kritik");
    expect(sub.intermediates.kutlesel_debi_kgs as number).toBeCloseTo(0.0019286, 6);
    const pgKritik = (191801.047 - 101325) / 1e5;
    const a = basincliHavaDelikKacakDebisi.compute({ ...g, hatBasinci_barg: pgKritik + 1e-5 }).intermediates.kutlesel_debi_kgs as number;
    const b = basincliHavaDelikKacakDebisi.compute({ ...g, hatBasinci_barg: pgKritik - 1e-5 }).intermediates.kutlesel_debi_kgs as number;
    expect(a).toBeCloseTo(b, 6);
  });
});
