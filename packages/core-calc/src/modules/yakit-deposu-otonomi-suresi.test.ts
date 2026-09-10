import { describe, expect, it } from "vitest";
import { yakitDeposuOtonomiSuresi } from "./yakit-deposu-otonomi-suresi";

describe("yakit-deposu-otonomi-suresi", () => {
  it("V=2000 L, Q=50 L/h → 40 saat (1.667 gün)", () => {
    const r = yakitDeposuOtonomiSuresi.compute({
      depoHacmi_V_L: 2000,
      yakitTuketimDebisi_Q_Lh: 50,
    });

    expect(r.value.otonomiSuresi_saat).toBeCloseTo(40, 5);
    expect(r.intermediates.otonomiSuresi_gun).toBeCloseTo(1.667, 2);
  });
});
