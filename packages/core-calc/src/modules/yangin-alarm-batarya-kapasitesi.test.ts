import { describe, it, expect } from "vitest";
import { yanginAlarmBataryaKapasitesi } from "./yangin-alarm-batarya-kapasitesi";

describe("Yangın Alarm Paneli Batarya Kapasitesi", () => {
  const g = { beklemeAkimi_mA: 60, alarmAkimi_mA: 300, beklemeSuresi_saat: 24, alarmSuresi_dk: 5, emniyetKatsayisi: 1.25, secilenBatarya_Ah: 2.4 };
  it("60 mA × 24 h + 300 mA × 5 dk = 1,44 + 0,025 Ah; ×1,25 = 1,83125 Ah; 2,4 Ah batarya → kullanım %76 uygun", () => {
    const r = yanginAlarmBataryaKapasitesi.compute(g);
    expect(r.intermediates.bekleme_Ah as number).toBeCloseTo(1.44, 10);
    expect(r.intermediates.alarm_Ah as number).toBeCloseTo(0.025, 10);
    expect(r.value.gerekliKapasite_Ah).toBeCloseTo(1.83125, 8);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("1,9 Ah batarya → kullanım %96 sınırda; 1,5 Ah → uygunsuz", () => {
    expect(yanginAlarmBataryaKapasitesi.compute({ ...g, secilenBatarya_Ah: 1.9 }).verdict?.status).toBe("sinirda");
    expect(yanginAlarmBataryaKapasitesi.compute({ ...g, secilenBatarya_Ah: 1.5 }).verdict?.status).toBe("uygunsuz");
  });
  it("alarm süresi 0 ise yalnız bekleme akımı belirleyicidir", () => {
    const r = yanginAlarmBataryaKapasitesi.compute({ ...g, alarmSuresi_dk: 0, emniyetKatsayisi: 1 });
    expect(r.value.gerekliKapasite_Ah).toBeCloseTo(1.44, 10);
  });
});
