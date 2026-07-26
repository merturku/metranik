import { describe, expect, it } from "vitest";
import { merdivenBasamakHesabi } from "./merdiven-basamak-hesabi";

describe("merdiven-basamak-hesabi", () => {
  it("Blondel: rıht=17cm, genişlik=29cm → 63cm, uygun aralıkta", () => {
    const r = merdivenBasamakHesabi.compute({ rihtYuksekligi_cm: 17, basamakGenisligi_cm: 29 });

    expect(r.value.blondelDegeri_cm).toBeCloseTo(63, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Blondel: rıht=12cm, genişlik=45cm → 69cm, aralık dışında uygunsuz", () => {
    const r = merdivenBasamakHesabi.compute({ rihtYuksekligi_cm: 12, basamakGenisligi_cm: 45 });

    expect(r.value.blondelDegeri_cm).toBeCloseTo(69, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
