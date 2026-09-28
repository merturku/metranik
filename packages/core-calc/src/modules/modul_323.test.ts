import { describe, it, expect } from "vitest";
import { modul_323 } from "./modul_323";

describe("Modül 323", () => {
  it("Test: 10 → 15", () => {
    const r = modul_323.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
