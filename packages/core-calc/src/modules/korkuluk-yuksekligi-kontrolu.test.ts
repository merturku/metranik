import { describe, expect, it } from "vitest";
import { korkulukYuksekligiKontrolu } from "./korkuluk-yuksekligi-kontrolu";

describe("korkuluk-yuksekligi-kontrolu", () => {
  it("ölçülen=100cm, asgari=90cm → marj=10cm, uygun", () => {
    const r = korkulukYuksekligiKontrolu.compute({
      olculenYukseklik_cm: 100,
      asgariYukseklik_cm: 90,
    });

    expect(r.value.marj_cm).toBeCloseTo(10, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ölçülen=80cm, asgari=90cm → uygunsuz", () => {
    const r = korkulukYuksekligiKontrolu.compute({
      olculenYukseklik_cm: 80,
      asgariYukseklik_cm: 90,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
