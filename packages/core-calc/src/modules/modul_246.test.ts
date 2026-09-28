import { describe, it, expect } from "vitest";
import { modul_246 } from "./modul_246";

describe("Modül 246", () => {
  it("Test: 10 → 15", () => {
    const r = modul_246.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
