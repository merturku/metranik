import { describe, it, expect } from "vitest";
import { foreKazikBetonHacmi } from "./fore-kazik-beton-hacmi";

describe("Fore Kazık Beton Hacmi", () => {
  it("Ø800, 20 m, 1 adet: teorik 10,0531 m³; %5 fire 10,5558 m³; %1 donatı 789,17 kg", () => {
    const r = foreKazikBetonHacmi.compute({ capi_mm: 800, boy_m: 20, adet: 1, firePayi: 0.05, donatiOrani: 0.01 });
    expect(r.intermediates.teorik_hacim_m3 as number).toBeCloseTo(10.05310, 4);
    expect(r.value.betonHacmi_m3).toBeCloseTo(10.55575, 4);
    expect(r.intermediates.boyuna_donati_kg as number).toBeCloseTo(789.168, 2);
  });
  it("adet ile doğrusal; çap iki katı → hacim 4 kat", () => {
    const a = foreKazikBetonHacmi.compute({ capi_mm: 800, boy_m: 20, adet: 1, firePayi: 0, donatiOrani: 0 }).value.betonHacmi_m3;
    expect(foreKazikBetonHacmi.compute({ capi_mm: 800, boy_m: 20, adet: 12, firePayi: 0, donatiOrani: 0 }).value.betonHacmi_m3 / a).toBeCloseTo(12, 10);
    expect(foreKazikBetonHacmi.compute({ capi_mm: 1600, boy_m: 20, adet: 1, firePayi: 0, donatiOrani: 0 }).value.betonHacmi_m3 / a).toBeCloseTo(4, 10);
  });
});
