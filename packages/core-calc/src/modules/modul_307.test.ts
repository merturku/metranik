import { describe, it, expect } from "vitest";
import { modul_307 } from "./modul_307";

describe("Modül 307", () => {
  it("Test: 10 → 15", () => {
    const r = modul_307.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
