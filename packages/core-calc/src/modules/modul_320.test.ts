import { describe, it, expect } from "vitest";
import { modul_320 } from "./modul_320";

describe("Modül 320", () => {
  it("Test: 10 → 15", () => {
    const r = modul_320.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
