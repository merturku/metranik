import { describe, it, expect } from "vitest";
import { modul_270 } from "./modul_270";

describe("Modül 270", () => {
  it("Test: 10 → 15", () => {
    const r = modul_270.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
