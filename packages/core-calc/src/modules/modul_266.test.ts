import { describe, it, expect } from "vitest";
import { modul_266 } from "./modul_266";

describe("Modül 266", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_266.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
