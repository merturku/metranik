import { describe, it, expect } from "vitest";
import { modul_239 } from "./modul_239";

describe("Modül 239", () => {
  it("Test: 10 → 15", () => {
    const r = modul_239.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
