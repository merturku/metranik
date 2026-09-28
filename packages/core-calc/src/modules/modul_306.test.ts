import { describe, it, expect } from "vitest";
import { modul_306 } from "./modul_306";

describe("Modül 306", () => {
  it("Test: 10 → 15", () => {
    const r = modul_306.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
