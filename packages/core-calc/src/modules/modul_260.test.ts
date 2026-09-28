import { describe, it, expect } from "vitest";
import { modul_260 } from "./modul_260";

describe("Modül 260", () => {
  it("Test: 10 → 15", () => {
    const r = modul_260.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
