import { describe, it, expect } from "vitest";
import { modul_286 } from "./modul_286";

describe("Modül 286", () => {
  it("Test: 10 → 15", () => {
    const r = modul_286.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
