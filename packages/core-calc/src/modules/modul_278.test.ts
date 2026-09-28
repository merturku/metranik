import { describe, it, expect } from "vitest";
import { modul_278 } from "./modul_278";

describe("Modül 278", () => {
  it("Test: 10 → 15", () => {
    const r = modul_278.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
