import { describe, it, expect } from "vitest";
import { buharTuketimiIsiSerpantini } from "./buhar-tuketimi-isi-serpantini";

describe("Buharlı Isıtıcı Buhar Tüketimi", () => {
  it("500 kW, h_fg 2100, η 1 → 0,2381 kg/s = 857,1 kg/h", () => {
    const r = buharTuketimiIsiSerpantini.compute({ isiYuku_kW: 500, gizliIsi_kJkg: 2100, verim: 1 });
    expect(r.intermediates.buhar_debisi_kgs as number).toBeCloseTo(0.2381, 4);
    expect(r.value.buharDebisi_kgh).toBeCloseTo(857.14, 1);
  });
  it("verim 0,9 debiyi 1/0,9 katına çıkarır", () => {
    const a = buharTuketimiIsiSerpantini.compute({ isiYuku_kW: 500, gizliIsi_kJkg: 2100, verim: 1 }).value.buharDebisi_kgh;
    const b = buharTuketimiIsiSerpantini.compute({ isiYuku_kW: 500, gizliIsi_kJkg: 2100, verim: 0.9 }).value.buharDebisi_kgh;
    expect(b / a).toBeCloseTo(1 / 0.9, 9);
  });
});
