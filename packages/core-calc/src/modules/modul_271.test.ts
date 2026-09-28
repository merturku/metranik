import { describe, it, expect } from "vitest";
import { modul_271 } from "./modul_271";
describe("M271", () => { it("T", () => { const r = modul_271.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
