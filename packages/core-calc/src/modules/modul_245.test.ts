import { describe, it, expect } from "vitest";
import { modul_245 } from "./modul_245";

describe("Modül 245", () => {
  it("Test: 10 → 15", () => {
    const r = modul_245.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
