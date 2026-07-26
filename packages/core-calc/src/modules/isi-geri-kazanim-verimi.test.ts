import { describe, expect, it } from "vitest";
import { isiGeriKazanimVerimi } from "./isi-geri-kazanim-verimi";

describe("isi-geri-kazanim-verimi", () => {
  it("giriş=0°C, çıkış=15°C, egzoz=22°C → ~%68.18", () => {
    const r = isiGeriKazanimVerimi.compute({
      tazeHavaGirisSicakligi_C: 0,
      tazeHavaCikisSicakligi_C: 15,
      egzozHavaSicakligi_C: 22,
    });

    expect(r.intermediates.sicaklikYukselmesi_C).toBeCloseTo(15, 5);
    expect(r.value.verim_yuzde).toBeCloseTo(68.182, 2);
  });
});
