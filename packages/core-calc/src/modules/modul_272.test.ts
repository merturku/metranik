import { describe, it, expect } from "vitest";
import { modul_272 } from "./modul_272";

describe("Modül 272", () => {
  it("Test: 10 → 15", () => {
    const r = modul_272.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
