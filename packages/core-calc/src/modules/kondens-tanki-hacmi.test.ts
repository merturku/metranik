import { describe, expect, it } from "vitest";
import { kondensTankiHacmi } from "./kondens-tanki-hacmi";

describe("kondens-tanki-hacmi", () => {
  it("Q=1000 kg/h, tutma süresi=5 dk → 16.667 L/dk, 83.33 L tank", () => {
    const r = kondensTankiHacmi.compute({
      kondensDebisi_kgh: 1000,
      tutmaSuresi_dk: 5,
    });

    expect(r.intermediates.debisi_Ldk).toBeCloseTo(16.667, 2);
    expect(r.value.tankHacmi_L).toBeCloseTo(83.33, 1);
  });
});
