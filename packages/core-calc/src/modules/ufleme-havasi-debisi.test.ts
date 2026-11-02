import { describe, it, expect } from "vitest";
import { uflemeHavasiDebisi } from "./ufleme-havasi-debisi";

describe("Üfleme Havası Debisi", () => {
  it("3000 W, ΔT 10 K → 3000/(1,2·1006·10) = 0,2485 m³/s = 894,6 m³/h; 100 m³ oda → 8,9 ACH", () => {
    const r = uflemeHavasiDebisi.compute({ duyulurYuk_W: 3000, sicaklikFarki_K: 10, odaHacmi_m3: 100 });
    expect(r.intermediates.debi_m3s as number).toBeCloseTo(0.2485, 4);
    expect(r.value.debi_m3h).toBeCloseTo(894.7, 0);
    expect(r.intermediates.hava_degisim_sayisi_ACH as number).toBeCloseTo(8.95, 1);
  });
  it("ΔT iki katına çıkınca debi yarıya iner", () => {
    const a = uflemeHavasiDebisi.compute({ duyulurYuk_W: 3000, sicaklikFarki_K: 10, odaHacmi_m3: 100 }).value.debi_m3h;
    const b = uflemeHavasiDebisi.compute({ duyulurYuk_W: 3000, sicaklikFarki_K: 20, odaHacmi_m3: 100 }).value.debi_m3h;
    expect(a / b).toBeCloseTo(2, 9);
  });
});
