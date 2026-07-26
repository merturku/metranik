import { describe, expect, it } from "vitest";
import { yerdenIsitmaBoruUzunlugu } from "./yerden-isitma-boru-uzunlugu";

describe("yerden-isitma-boru-uzunlugu", () => {
  it("Alan=20m², Aralık=0.15m → ~133.33 m", () => {
    const r = yerdenIsitmaBoruUzunlugu.compute({
      isitilanAlan_m2: 20,
      boruAraligi_m: 0.15,
    });

    expect(r.value.toplamBoruUzunlugu_m).toBeCloseTo(133.333, 2);
  });
});
