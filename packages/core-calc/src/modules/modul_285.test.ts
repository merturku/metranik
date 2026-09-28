import { describe, it, expect } from "vitest";
import { modul_285 } from "./modul_285";

describe("Modül 285", () => {
  it("Test: 10 → 15", () => {
    const r = modul_285.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
