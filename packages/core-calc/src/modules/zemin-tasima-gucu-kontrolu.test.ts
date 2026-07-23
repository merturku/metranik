import { describe, expect, it } from "vitest";
import { zeminTasimaGucuKontrolu } from "./zemin-tasima-gucu-kontrolu";

describe("zemin-tasima-gucu-kontrolu", () => {
  it("uygulanan gerilme emniyet gerilmesinin altındaysa uygun döner", () => {
    const r = zeminTasimaGucuKontrolu.compute({
      uygulananGerilme_kPa: 150,
      zeminEmniyetGerilmesi_kPa: 200,
    });

    expect(r.value.marj_kPa).toBeCloseTo(50, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("uygulanan gerilme emniyet gerilmesini aşarsa uygunsuz döner", () => {
    const r = zeminTasimaGucuKontrolu.compute({
      uygulananGerilme_kPa: 250,
      zeminEmniyetGerilmesi_kPa: 200,
    });

    expect(r.value.marj_kPa).toBeCloseTo(-50, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
