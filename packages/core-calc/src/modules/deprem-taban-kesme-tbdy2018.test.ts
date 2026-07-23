import { describe, expect, it } from "vitest";
import { depremTabanKesmeTbdy2018 } from "./deprem-taban-kesme-tbdy2018";

describe("deprem-taban-kesme-tbdy2018", () => {
  // Vt = 0.5×10000×1.0/4 = 1250 kN, bağımsız doğrulanabilir (eşdeğer statik yük formülü).
  it("Sa=0.5, W=10000 kN, I=1.0, R=4 için taban kesme kuvvetini hesaplar", () => {
    const r = depremTabanKesmeTbdy2018.compute({
      spektralIvme_Sa: 0.5,
      binaAgirligi_kN: 10000,
      onemKatsayisi_I: 1.0,
      tasiyiciSistemKatsayisi_R: 4,
    });

    expect(r.value.tabanKesmeKuvveti_kN).toBeCloseTo(1250, 5);
  });

  it("daha yüksek R (daha sünek sistem) daha düşük taban kesme kuvveti verir", () => {
    const dusukR = depremTabanKesmeTbdy2018.compute({
      spektralIvme_Sa: 0.5,
      binaAgirligi_kN: 10000,
      onemKatsayisi_I: 1.0,
      tasiyiciSistemKatsayisi_R: 4,
    });
    const yuksekR = depremTabanKesmeTbdy2018.compute({
      spektralIvme_Sa: 0.5,
      binaAgirligi_kN: 10000,
      onemKatsayisi_I: 1.0,
      tasiyiciSistemKatsayisi_R: 8,
    });

    expect(yuksekR.value.tabanKesmeKuvveti_kN).toBeLessThan(dusukR.value.tabanKesmeKuvveti_kN);
  });
});
