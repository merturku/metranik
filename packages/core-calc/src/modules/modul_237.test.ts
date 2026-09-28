import { describe, it, expect } from "vitest";
import { modul_237 } from "./modul_237";

describe("Modül 237", () => {
  it("Test: 10 → 15", () => {
    const r = modul_237.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
