import { describe, expect, it } from "vitest";
import { sonsuzSevStabilitesi } from "./sonsuz-sev-stabilitesi";

describe("sonsuzSevStabilitesi", () => {
  it("φ=32°, β=20° → FS≈1.72, uygun", () => {
    const r = sonsuzSevStabilitesi.compute({
      icselSurtunmeAcisi_phi_derece: 32,
      sevEgimAcisi_beta_derece: 20,
    });
    expect(r.value.guvenlikKatsayisi_FS).toBeCloseTo(1.7168, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("β, φ'ye yaklaşınca FS 1'e yaklaşır", () => {
    const r = sonsuzSevStabilitesi.compute({
      icselSurtunmeAcisi_phi_derece: 30,
      sevEgimAcisi_beta_derece: 28,
    });
    expect(r.value.guvenlikKatsayisi_FS).toBeGreaterThan(1.0);
    expect(r.value.guvenlikKatsayisi_FS).toBeLessThan(1.5);
    expect(r.verdict?.status).toBe("sinirda");
  });
});
