import { describe, it, expect } from "vitest";
import { modul_260 } from "./modul_260";
describe("M260", () => { it("T", () => { const r = modul_260.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
