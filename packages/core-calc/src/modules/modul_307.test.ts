import { describe, it, expect } from "vitest";
import { modul_307 } from "./modul_307";

describe("Modül 307", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_307.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
