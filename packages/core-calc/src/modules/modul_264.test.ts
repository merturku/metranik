import { describe, it, expect } from "vitest";
import { modul_264 } from "./modul_264";
describe("M264", () => { it("T", () => { const r = modul_264.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
