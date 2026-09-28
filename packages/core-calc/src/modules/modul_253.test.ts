import { describe, it, expect } from "vitest";
import { modul_253 } from "./modul_253";

describe("Modül 253", () => {
  it("Test: 10 → 15", () => {
    const r = modul_253.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
