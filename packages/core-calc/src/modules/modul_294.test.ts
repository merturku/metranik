import { describe, it, expect } from "vitest";
import { modul_294 } from "./modul_294";

describe("Modül 294", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_294.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
