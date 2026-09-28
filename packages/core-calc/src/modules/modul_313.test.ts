import { describe, it, expect } from "vitest";
import { modul_313 } from "./modul_313";

describe("Modül 313", () => {
  it("Test: 10 → 15", () => {
    const r = modul_313.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
