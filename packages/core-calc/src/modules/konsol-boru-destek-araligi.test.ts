import { describe, expect, it } from "vitest";
import { konsolBoruDestekAraligi } from "./konsol-boru-destek-araligi";

describe("konsol-boru-destek-araligi", () => {
  it("w=150 N/m, L=1.2m, Wx=5cm³, izin=140MPa → ~21.6 MPa, uygun", () => {
    const r = konsolBoruDestekAraligi.compute({
      yayiliYuk_w_Nm: 150,
      konsolUzunlugu_L_m: 1.2,
      kesitModulu_Wx_cm3: 5,
      izinVerilenGerilme_sigma_MPa: 140,
    });

    expect(r.intermediates.maksimumMoment_Nm).toBeCloseTo(108, 5);
    expect(r.value.gerilme_MPa).toBeCloseTo(21.6, 1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("aşırı yüklü/uzun konsolda gerilme sınırı aşılır → uygunsuz", () => {
    const r = konsolBoruDestekAraligi.compute({
      yayiliYuk_w_Nm: 150,
      konsolUzunlugu_L_m: 3.5,
      kesitModulu_Wx_cm3: 5,
      izinVerilenGerilme_sigma_MPa: 140,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
