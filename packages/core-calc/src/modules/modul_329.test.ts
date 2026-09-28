import { describe, it, expect } from "vitest";
import { modul_329 } from "./modul_329";

describe("Modül 329", () => {
  it("Test: 10 → 15", () => {
    const r = modul_329.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
