import { describe, it, expect } from "vitest";
import { modul_329 } from "./modul_329";

describe("Modül 329", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_329.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
