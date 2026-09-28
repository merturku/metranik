import { describe, it, expect } from "vitest";
import { modul_296 } from "./modul_296";
describe("M296", () => { it("T", () => { const r = modul_296.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
