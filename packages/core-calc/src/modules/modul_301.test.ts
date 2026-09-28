import { describe, it, expect } from "vitest";
import { modul_301 } from "./modul_301";
describe("M301", () => { it("T", () => { const r = modul_301.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
