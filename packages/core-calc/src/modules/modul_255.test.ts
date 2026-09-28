import { describe, it, expect } from "vitest";
import { modul_255 } from "./modul_255";

describe("Modül 255", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_255.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
