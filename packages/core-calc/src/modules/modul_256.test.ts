import { describe, it, expect } from "vitest";
import { modul_256 } from "./modul_256";

describe("Modül 256", () => {
  it("Test: 10 → 15", () => {
    const r = modul_256.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
