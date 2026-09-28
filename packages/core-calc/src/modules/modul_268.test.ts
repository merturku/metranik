import { describe, it, expect } from "vitest";
import { modul_268 } from "./modul_268";

describe("Modül 268", () => {
  it("Test: 10 → 15", () => {
    const r = modul_268.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
