import { describe, it, expect } from "vitest";
import { modul_262 } from "./modul_262";
describe("M262", () => { it("T", () => { const r = modul_262.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
