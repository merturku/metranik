import { describe, it, expect } from "vitest";
import { modul_303 } from "./modul_303";
describe("M303", () => { it("T", () => { const r = modul_303.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
