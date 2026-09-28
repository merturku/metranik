import { describe, it, expect } from "vitest";
import { modul_288 } from "./modul_288";

describe("Modül 288", () => {
  it("Test: 10 → 15", () => {
    const r = modul_288.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
