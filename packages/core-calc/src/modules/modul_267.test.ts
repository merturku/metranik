import { describe, it, expect } from "vitest";
import { modul_267 } from "./modul_267";

describe("Modül 267", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_267.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
