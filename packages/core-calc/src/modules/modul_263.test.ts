import { describe, it, expect } from "vitest";
import { modul_263 } from "./modul_263";
describe("M263", () => { it("T", () => { const r = modul_263.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
