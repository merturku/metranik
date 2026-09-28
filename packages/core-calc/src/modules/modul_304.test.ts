import { describe, it, expect } from "vitest";
import { modul_304 } from "./modul_304";

describe("Modül 304", () => {
  it("Test: 10 → 15", () => {
    const r = modul_304.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
