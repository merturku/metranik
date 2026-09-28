import { describe, it, expect } from "vitest";
import { modul_275 } from "./modul_275";

describe("Modül 275", () => {
  it("Test: 10 → 15", () => {
    const r = modul_275.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
