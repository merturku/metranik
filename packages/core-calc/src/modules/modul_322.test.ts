import { describe, it, expect } from "vitest";
import { modul_322 } from "./modul_322";

describe("Modül 322", () => {
  it("Test: 10 → 15", () => {
    const r = modul_322.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
