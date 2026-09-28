import { describe, it, expect } from "vitest";
import { modul_317 } from "./modul_317";

describe("Modül 317", () => {
  it("Test: 10 → 15", () => {
    const r = modul_317.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
