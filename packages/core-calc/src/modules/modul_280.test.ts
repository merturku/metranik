import { describe, it, expect } from "vitest";
import { modul_280 } from "./modul_280";

describe("Modül 280", () => {
  it("Test: 10 → 15", () => {
    const r = modul_280.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
