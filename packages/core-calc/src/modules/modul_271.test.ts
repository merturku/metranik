import { describe, it, expect } from "vitest";
import { modul_271 } from "./modul_271";

describe("Modül 271", () => {
  it("Test: 10 → 15", () => {
    const r = modul_271.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
