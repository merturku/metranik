import { describe, expect, it } from "vitest";
import { motorSenkronHizi } from "./motor-senkron-hizi";

describe("motorSenkronHizi", () => {
  it("f=50 Hz, p=4 kutup → n=1500 rpm", () => {
    const r = motorSenkronHizi.compute({ sebekeFrekansi_f_Hz: 50, kutupSayisi_p: 4 });
    expect(r.value.senkronHiz_n_rpm).toBeCloseTo(1500, 3);
  });
});
