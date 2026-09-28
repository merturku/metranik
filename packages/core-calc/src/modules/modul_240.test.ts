import { describe, it, expect } from "vitest";
import { modul_240 } from "./modul_240";

describe("Modül 240", () => {
  it("Test: 10 → 15", () => {
    const r = modul_240.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
