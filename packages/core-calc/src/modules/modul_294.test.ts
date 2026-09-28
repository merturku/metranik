import { describe, it, expect } from "vitest";
import { modul_294 } from "./modul_294";

describe("Modül 294", () => {
  it("Test: 10 → 15", () => {
    const r = modul_294.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
