import { describe, it, expect } from "vitest";
import { modul_290 } from "./modul_290";

describe("Modül 290", () => {
  it("Test: 10 → 15", () => {
    const r = modul_290.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
