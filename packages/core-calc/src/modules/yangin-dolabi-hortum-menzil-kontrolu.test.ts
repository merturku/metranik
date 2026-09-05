import { describe, expect, it } from "vitest";
import { yanginDolabiHortumMenzilKontrolu } from "./yangin-dolabi-hortum-menzil-kontrolu";

describe("yangin-dolabi-hortum-menzil-kontrolu", () => {
  it("hortum=15m, jet menzili=6m, kapsanması gereken=18m → sağlanan 21m → uygun", () => {
    const r = yanginDolabiHortumMenzilKontrolu.compute({
      hortumUzunlugu_m: 15,
      suJetiMenzili_m: 6,
      kapsanmasiGerekenMesafe_m: 18,
    });

    expect(r.value.saglananMenzil_m).toBeCloseTo(21, 5);
    expect(r.verdict?.status).toBe("uygun");
  });
});
