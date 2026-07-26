import { describe, expect, it } from "vitest";
import { upsBataryaKapasitesi } from "./ups-batarya-kapasitesi";

describe("ups-batarya-kapasitesi", () => {
  it("2000W yük, 1h yedek, verim=0.9, 48V → ~46.3 Ah", () => {
    const r = upsBataryaKapasitesi.compute({
      yuk_W: 2000,
      yedekSure_h: 1,
      verim_eta: 0.9,
      sistemGerilimi_V: 48,
    });

    expect(r.value.gerekliKapasite_Ah).toBeCloseTo(46.296, 2);
  });
});
