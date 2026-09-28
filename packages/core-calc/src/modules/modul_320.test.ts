import { describe, it, expect } from "vitest";
import { modul_320 } from "./modul_320";
describe("M320", () => { it("T", () => { const r = modul_320.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
