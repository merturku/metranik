import { describe, it, expect } from "vitest";
import { modul_269 } from "./modul_269";

describe("Modül 269", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_269.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
