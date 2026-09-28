import { describe, it, expect } from "vitest";
import { modul_259 } from "./modul_259";

describe("Modül 259", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_259.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
