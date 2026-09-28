import { describe, it, expect } from "vitest";
import { modul_296 } from "./modul_296";

describe("Modül 296", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_296.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
