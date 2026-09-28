import { describe, it, expect } from "vitest";
import { modul_299 } from "./modul_299";

describe("Modül 299", () => {
  it("Test: 10 → 15", () => {
    const r = modul_299.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
