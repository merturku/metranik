import { describe, it, expect } from "vitest";
import { modul_296 } from "./modul_296";

describe("Modül 296", () => {
  it("Test: 10 → 15", () => {
    const r = modul_296.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
