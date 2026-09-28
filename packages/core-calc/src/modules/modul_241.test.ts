import { describe, it, expect } from "vitest";
import { modul_241 } from "./modul_241";

describe("Modül 241", () => {
  it("Test: 10 → 15", () => {
    const r = modul_241.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
