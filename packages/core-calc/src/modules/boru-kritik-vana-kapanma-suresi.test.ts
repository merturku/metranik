import { describe, expect, it } from "vitest";
import { boruKritikVanaKapanmaSuresi } from "./boru-kritik-vana-kapanma-suresi";

describe("boru-kritik-vana-kapanma-suresi", () => {
  it("L=500m, a=1200 m/s, kapanma süresi=3s → tc=0.833s, 3s≥tc → uygun (yavaş kapanma)", () => {
    const r = boruKritikVanaKapanmaSuresi.compute({
      boruUzunlugu_L_m: 500,
      basincDalgasiHizi_a_ms: 1200,
      vanaKapanmaSuresi_tkapanma_s: 3,
    });

    expect(r.value.kritikKapanmaSuresi_tc_s).toBeCloseTo(0.8333, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
});
