import { describe, it, expect } from "vitest";
import { modul_291 } from "./modul_291";

describe("Modül 291", () => {
  it("Test: 10 → 15", () => {
    const r = modul_291.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
