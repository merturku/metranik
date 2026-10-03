import { describe, it, expect } from "vitest";
import { evElektrikTasarufuGeriOdeme } from "./ev-elektrik-tasarrufu-geri-odeme";

describe("Elektrik Tasarrufu Geri Ödeme", () => {
  it("50.000 TL yatırım, 10.000 TL/yıl tasarruf → 5 yıl", () => {
    const r = evElektrikTasarufuGeriOdeme.compute({ yatirim_TL: 50000, yillik_tasarruf_TL: 10000 });
    expect(r.value.sure_yil).toBeCloseTo(5, 0);
  });
});
