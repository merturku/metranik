import { describe, it, expect } from "vitest";
import { modul_287 } from "./modul_287";

describe("Modül 287", () => {
  it("Test: 10 → 15", () => {
    const r = modul_287.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
