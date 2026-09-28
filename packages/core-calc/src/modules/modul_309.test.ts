import { describe, it, expect } from "vitest";
import { modul_309 } from "./modul_309";

describe("Modül 309", () => {
  it("Test: 10 → 15", () => {
    const r = modul_309.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
