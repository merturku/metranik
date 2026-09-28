import { describe, it, expect } from "vitest";
import { modul_325 } from "./modul_325";

describe("Modül 325", () => {
  it("Test: 10 → 15", () => {
    const r = modul_325.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
