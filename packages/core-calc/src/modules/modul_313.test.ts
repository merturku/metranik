import { describe, it, expect } from "vitest";
import { modul_313 } from "./modul_313";

describe("Modül 313", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_313.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
