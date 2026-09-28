import { describe, it, expect } from "vitest";
import { modul_254 } from "./modul_254";

describe("Modül 254", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_254.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
