import { describe, it, expect } from "vitest";
import { modul_270 } from "./modul_270";

describe("Modül 270", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_270.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
