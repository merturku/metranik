import { describe, expect, it } from "vitest";
import { gerilimDusumuKontrolu } from "./gerilim-dusumu-kontrolu";

describe("gerilim-dusumu-kontrolu", () => {
  it("ölçülen düşüm izin verilen sınırın altındaysa uygun döner", () => {
    const r = gerilimDusumuKontrolu.compute({
      olculenGerilimDusumu_yuzde: 1.64,
      izinVerilenYuzde: 3,
    });

    expect(r.value.marj_yuzde).toBeCloseTo(1.36, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ölçülen düşüm izin verilen sınırı aşarsa uygunsuz döner", () => {
    const r = gerilimDusumuKontrolu.compute({
      olculenGerilimDusumu_yuzde: 4,
      izinVerilenYuzde: 3,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
