import { describe, it, expect } from "vitest";
import { yukFaktoruTalepAnalizi } from "./yuk-faktoru-talep-analizi";

describe("Yük Faktörü ve Talep Analizi", () => {
  it("72 000 kWh / 720 h = 100 kW ort.; pik 200 kW → LF = 0,5; kurulu 400 kW → UF 0,5; talep bedeli 200·150 = 30 000 ₺", () => {
    const r = yukFaktoruTalepAnalizi.compute({ tuketim_kWh: 72000, donemSuresi_h: 720, pikTalep_kW: 200, kuruluGuc_kW: 400, talepBedeli_TLkW: 150 });
    expect(r.value.yukFaktoru).toBeCloseTo(0.5, 8);
    expect(r.intermediates.kullanim_faktoru).toBeCloseTo(0.5, 8);
    expect(r.intermediates.talep_bedeli_TL as number).toBeCloseTo(30000, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("pik 500 kW → LF = 0,2 → sınırda; pik 90 kW (ort. 100) → LF > 1 → uygunsuz", () => {
    expect(yukFaktoruTalepAnalizi.compute({ tuketim_kWh: 72000, donemSuresi_h: 720, pikTalep_kW: 500, kuruluGuc_kW: 600, talepBedeli_TLkW: 150 }).verdict?.status).toBe("sinirda");
    expect(yukFaktoruTalepAnalizi.compute({ tuketim_kWh: 72000, donemSuresi_h: 720, pikTalep_kW: 90, kuruluGuc_kW: 100, talepBedeli_TLkW: 0 }).verdict?.status).toBe("uygunsuz");
  });
});
