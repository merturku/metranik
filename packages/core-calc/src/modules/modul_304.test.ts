import { describe, it, expect } from "vitest";
import { modul_304 } from "./modul_304";

describe("Modül 304", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_304.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
