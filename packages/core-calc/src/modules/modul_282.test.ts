import { describe, it, expect } from "vitest";
import { modul_282 } from "./modul_282";

describe("Modül 282", () => {
  it("Test: 10 → 15", () => {
    const r = modul_282.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
