import { describe, it, expect } from "vitest";
import { modul_247 } from "./modul_247";

describe("Modül 247", () => {
  it("Test: 10 → 15", () => {
    const r = modul_247.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
