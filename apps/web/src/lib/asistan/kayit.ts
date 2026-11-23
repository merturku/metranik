// AI asistanın kullandığı sunucu tarafı araçlar. LLM asla hesap yapmaz (CLAUDE.md §3):
// yalnız modül arar, şema okur ve deterministik motoru (core-calc) çağırır.
import * as core from "@metranik/core-calc";
import { TUM_MODULLER } from "@/lib/modules";

interface MotorModulu {
  id: string;
  title: string;
  discipline: string;
  standards: string[];
  inputSchema: { safeParse: (v: unknown) => { success: true; data: unknown } | { success: false; error: { issues: { path: (string | number)[]; message: string }[] } } };
  compute: (girdi: never) => {
    value: unknown;
    intermediates: Record<string, number | string>;
    standardsUsed: string[];
    verdict?: { status: string; note: string };
  };
}

function modulMu(m: unknown): m is MotorModulu {
  if (!m || typeof m !== "object") return false;
  const o = m as Record<string, unknown>;
  return typeof o.id === "string" && typeof o.compute === "function" && !!o.inputSchema;
}

const KAYIT: Map<string, MotorModulu> = new Map(
  Object.values(core as Record<string, unknown>)
    .filter(modulMu)
    .map((m) => [m.id, m]),
);

export function modulSayisi(): number {
  return KAYIT.size;
}

function sadelestir(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9 ]+/g, " ");
}

export interface AramaSonucu {
  id: string;
  baslik: string;
  standart: string;
}

export function modulAra(sorgu: string, adet = 8): AramaSonucu[] {
  const kelimeler = sadelestir(sorgu)
    .split(/\s+/)
    .filter((k) => k.length >= 3)
    .map((k) => k.slice(0, Math.max(4, Math.min(k.length, 6))));
  if (kelimeler.length === 0) return [];
  const puanli = TUM_MODULLER.filter((m) => KAYIT.has(m.id)).map((m) => {
    const baslik = sadelestir(m.title);
    const id = sadelestir(m.id);
    const std = sadelestir(m.standard);
    let p = 0;
    for (const k of kelimeler) {
      if (baslik.includes(k)) p += 3;
      else if (id.includes(k)) p += 2;
      if (std.includes(k)) p += 1;
    }
    return { m, p };
  });
  return puanli
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p)
    .slice(0, adet)
    .map(({ m }) => ({ id: m.id, baslik: m.title, standart: m.standard }));
}

// --- Zod v3 şemasından sade JSON Schema (yalnız modüllerde kullanılan türler) ---
type Tanim = { typeName?: string; [k: string]: unknown };
function tanimi(s: unknown): Tanim {
  return ((s as { _def?: Tanim })._def ?? {}) as Tanim;
}

function jsonSemasi(s: unknown): Record<string, unknown> {
  const d = tanimi(s);
  switch (d.typeName) {
    case "ZodObject": {
      const sekil = (d.shape as () => Record<string, unknown>)();
      const ozellikler: Record<string, unknown> = {};
      const zorunlu: string[] = [];
      for (const [k, v] of Object.entries(sekil)) {
        ozellikler[k] = jsonSemasi(v);
        const tn = tanimi(v).typeName;
        if (tn !== "ZodOptional" && tn !== "ZodDefault") zorunlu.push(k);
      }
      return { type: "object", properties: ozellikler, required: zorunlu };
    }
    case "ZodNumber": {
      const o: Record<string, unknown> = { type: "number" };
      for (const c of (d.checks as { kind: string; value?: number; inclusive?: boolean }[] | undefined) ?? []) {
        if (c.kind === "min" && c.value !== undefined) o[c.inclusive === false ? "exclusiveMinimum" : "minimum"] = c.value;
        if (c.kind === "max" && c.value !== undefined) o[c.inclusive === false ? "exclusiveMaximum" : "maximum"] = c.value;
      }
      return o;
    }
    case "ZodString":
      return { type: "string" };
    case "ZodBoolean":
      return { type: "boolean" };
    case "ZodEnum":
      return { type: "string", enum: d.values };
    case "ZodLiteral":
      return { const: d.value };
    case "ZodOptional":
    case "ZodNullable":
      return jsonSemasi(d.innerType);
    case "ZodDefault":
      return jsonSemasi(d.innerType);
    case "ZodEffects":
      return jsonSemasi(d.schema);
    default:
      return {};
  }
}

export function modulSemasi(id: string): { hata: string } | { id: string; baslik: string; standartlar: string[]; girdiSemasi: Record<string, unknown> } {
  const m = KAYIT.get(id);
  if (!m) return { hata: `Modül bulunamadı: ${id}` };
  return { id: m.id, baslik: m.title, standartlar: m.standards, girdiSemasi: jsonSemasi(m.inputSchema) };
}

// JSON'a güvenli: NaN / ±Infinity → null
function temizle(v: unknown): unknown {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (Array.isArray(v)) return v.map(temizle);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, temizle(x)]));
  return v;
}

export interface HesapKaydi {
  modulId: string;
  baslik: string;
  girdi: Record<string, unknown>;
  sonuc: unknown;
  araDegerler: Record<string, unknown>;
  standartlar: string[];
  hukum?: { status: string; note: string };
  href: string;
}

export function modulHesapla(id: string, girdi: unknown): { hata: string; sorunlar?: string[] } | { kayit: HesapKaydi } {
  const m = KAYIT.get(id);
  if (!m) return { hata: `Modül bulunamadı: ${id}` };
  const p = m.inputSchema.safeParse(girdi);
  if (!p.success) {
    return { hata: "Girdiler geçersiz veya eksik", sorunlar: p.error.issues.map((i) => `${i.path.join(".") || "(genel)"}: ${i.message}`) };
  }
  let r;
  try {
    r = m.compute(p.data as never);
  } catch (e) {
    return { hata: `Hesap hatası: ${e instanceof Error ? e.message : "bilinmiyor"}` };
  }
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries((girdi ?? {}) as Record<string, unknown>)) q.set(k, String(v));
  return {
    kayit: {
      modulId: m.id,
      baslik: m.title,
      girdi: (girdi ?? {}) as Record<string, unknown>,
      sonuc: temizle(r.value),
      araDegerler: temizle(r.intermediates) as Record<string, unknown>,
      standartlar: r.standardsUsed,
      hukum: r.verdict,
      href: `/${m.id}?${q.toString()}`,
    },
  };
}
