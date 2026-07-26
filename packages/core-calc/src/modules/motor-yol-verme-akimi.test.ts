import { describe, expect, it } from "vitest";
import { motorYolVermeAkimi } from "./motor-yol-verme-akimi";

describe("motor-yol-verme-akimi", () => {
  it("Inom=50A, DOL başlama oranı=7 → 350A", () => {
    const r = motorYolVermeAkimi.compute({ nominalAkim_A: 50, baslamaOrani: 7 });

    expect(r.value.kalkisAkimi_A).toBeCloseTo(350, 5);
  });
});
