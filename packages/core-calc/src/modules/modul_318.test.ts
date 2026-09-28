import { describe, it, expect } from "vitest";
import { modul_318 } from "./modul_318";

describe("Modül 318", () => {
  it("Test: 10 → 15", () => {
    const r = modul_318.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
