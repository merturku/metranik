import { describe, it, expect } from "vitest";
import { modul_257 } from "./modul_257";
describe("M257", () => { it("T", () => { const r = modul_257.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
