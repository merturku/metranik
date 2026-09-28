import { describe, it, expect } from "vitest";
import { modul_275 } from "./modul_275";

describe("Modül 275", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_275.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
