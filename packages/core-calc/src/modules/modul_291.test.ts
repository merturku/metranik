import { describe, it, expect } from "vitest";
import { modul_291 } from "./modul_291";
describe("M291", () => { it("T", () => { const r = modul_291.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
