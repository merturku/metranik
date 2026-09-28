import { describe, it, expect } from "vitest";
import { modul_281 } from "./modul_281";

describe("Modül 281", () => {
  it("Test: 10 → 15", () => {
    const r = modul_281.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
