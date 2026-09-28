import { describe, it, expect } from "vitest";
import { modul_254 } from "./modul_254";

describe("Modül 254", () => {
  it("Test: 10 → 15", () => {
    const r = modul_254.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
