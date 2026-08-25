import { describe, expect, it } from "vitest";
import { notrTopraklamaDirenciSecimi } from "./notr-topraklama-direnci-secimi";

describe("notr-topraklama-direnci-secimi", () => {
  it("Vfaz=231V, hedef arıza akımı=400A → R=0.5775 Ω, P=92.4 kW", () => {
    const r = notrTopraklamaDirenciSecimi.compute({
      fazGerilimi_V: 231,
      hedefArizaAkimi_A: 400,
    });

    expect(r.value.ngrDirenci_ohm).toBeCloseTo(0.5775, 4);
    expect(r.intermediates.gucKaybi_kW).toBeCloseTo(92.4, 1);
  });
});
