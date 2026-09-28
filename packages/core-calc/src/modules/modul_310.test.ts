import { describe, it, expect } from "vitest";
import { modul_310 } from "./modul_310";

describe("Modül 310", () => {
  it("Test: 10 → 15", () => {
    const r = modul_310.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
