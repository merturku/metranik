import { describe, it, expect } from "vitest";
import { modul_287 } from "./modul_287";

describe("Modül 287", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_287.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
