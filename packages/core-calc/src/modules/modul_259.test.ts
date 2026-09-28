import { describe, it, expect } from "vitest";
import { modul_259 } from "./modul_259";

describe("Modül 259", () => {
  it("Test: 10 → 15", () => {
    const r = modul_259.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
