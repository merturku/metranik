import { describe, it, expect } from "vitest";
import { modul_257 } from "./modul_257";

describe("Modül 257", () => {
  it("Test: 10 → 15", () => {
    const r = modul_257.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
