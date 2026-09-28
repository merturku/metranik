import { describe, it, expect } from "vitest";
import { modul_301 } from "./modul_301";

describe("Modül 301", () => {
  it("Test: 10 → 15", () => {
    const r = modul_301.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
