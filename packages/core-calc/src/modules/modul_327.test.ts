import { describe, it, expect } from "vitest";
import { modul_327 } from "./modul_327";

describe("Modül 327", () => {
  it("Test: 10 → 15", () => {
    const r = modul_327.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
