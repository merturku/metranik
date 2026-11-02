import { describe, it, expect } from "vitest";
import { pisSuPompaKuyusuHacmi } from "./pis-su-pompa-kuyusu-hacmi";

describe("Pompa Kuyusu Hacmi", () => {
  it("300 L/dk, 6 kalkış/saat → T = 10 dk, V = 750 L, 1 m² kesitte 0,75 m", () => {
    const r = pisSuPompaKuyusuHacmi.compute({ pompaDebisi_Lmin: 300, azamiKalkisSayisi_saat: 6, kuyuKesitAlani_m2: 1 });
    expect(r.value.faydaliHacim_L).toBeCloseTo(750, 9);
    expect(r.intermediates.start_stop_seviye_farki_m as number).toBeCloseTo(0.75, 9);
  });
});
