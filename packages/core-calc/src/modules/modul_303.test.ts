import { describe, it, expect } from "vitest";
import { modul_303 } from "./modul_303";

describe("Modül 303", () => {
  it("Test: 10 → 15", () => {
    const r = modul_303.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
