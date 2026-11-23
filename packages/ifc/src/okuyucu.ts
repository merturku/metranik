/**
 * web-ifc ile IFC modelinden metraj çıkarımı.
 * Miktarlar IFC'de eleman özelliği değil, IfcRelDefinesByProperties ilişkisiyle bağlanan
 * IfcElementQuantity (Qto_*) ve IfcPropertySet kümelerinde durur; burada o ilişki izlenir.
 * IFC'de bulunmayan değer asla tahmin edilmez.
 */
import type { IfcEleman, IfcKategori, IfcMetrajSonucu, MetrajGrubu } from "./types";

export interface IfcVektor {
  size(): number;
  get(i: number): number;
}
export interface IfcApiBenzeri {
  GetLineIDsWithType(modelID: number, type: number): IfcVektor;
  GetLine(modelID: number, expressID: number): any;
}
/** web-ifc modülünün sabitleri (IFCPIPESEGMENT vb.) */
export type IfcSabitleri = Record<string, any>;

const SINIFLAR: { sinif: string; kategori: IfcKategori }[] = [
  { sinif: "IFCPIPESEGMENT", kategori: "boru" },
  { sinif: "IFCDUCTSEGMENT", kategori: "kanal" },
  { sinif: "IFCCABLESEGMENT", kategori: "kablo" },
  { sinif: "IFCCABLECARRIERSEGMENT", kategori: "tava" },
  { sinif: "IFCPUMP", kategori: "ekipman" },
  { sinif: "IFCFAN", kategori: "ekipman" },
  { sinif: "IFCBOILER", kategori: "ekipman" },
  { sinif: "IFCCHILLER", kategori: "ekipman" },
  { sinif: "IFCELECTRICMOTOR", kategori: "ekipman" },
  { sinif: "IFCTRANSFORMER", kategori: "ekipman" },
  { sinif: "IFCCOMPRESSOR", kategori: "ekipman" },
  { sinif: "IFCHEATEXCHANGER", kategori: "ekipman" },
  { sinif: "IFCTANK", kategori: "ekipman" },
];

const SI_ONEKLERI: Record<string, number> = {
  EXA: 1e18, PETA: 1e15, TERA: 1e12, GIGA: 1e9, MEGA: 1e6, KILO: 1e3, HECTO: 1e2, DECA: 10,
  DECI: 0.1, CENTI: 0.01, MILLI: 0.001, MICRO: 1e-6, NANO: 1e-9,
};

function normalize(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]/g, "");
}

const UZUNLUK_ADLARI = ["length", "netlength", "grosslength", "uzunluk", "netuzunluk", "brutuzunluk"];
const CAP_ADLARI = ["outsidediameter", "outerdiameter", "discap", "nominaldiameter", "diameter", "capi", "cap"];
const GENISLIK_ADLARI = ["width", "nominalwidth", "ductwidth", "genislik"];
const YUKSEKLIK_ADLARI = ["height", "nominalheight", "ductheight", "yukseklik"];

function refId(v: any): number | null {
  return v && typeof v === "object" && v.type === 5 && typeof v.value === "number" ? v.value : null;
}
function degerOf(v: any): any {
  return v && typeof v === "object" ? v.value : v;
}
function liste(v: any): any[] {
  return Array.isArray(v) ? v : [];
}

interface Olcu {
  ad: string;
  /** IFC birimiyle ham sayı */
  deger: number;
  kaynak: "qto" | "pset";
}

function uzunlukBirimiBul(api: IfcApiBenzeri, W: IfcSabitleri, modelID: number, uyarilar: string[]): number {
  try {
    const projeler = api.GetLineIDsWithType(modelID, W.IFCPROJECT);
    if (projeler.size() === 0) throw new Error("IfcProject yok");
    const proje = api.GetLine(modelID, projeler.get(0));
    const ua = api.GetLine(modelID, refId(proje.UnitsInContext) ?? -1);
    for (const u of liste(ua?.Units)) {
      const id = refId(u);
      if (id === null) continue;
      const birim = api.GetLine(modelID, id);
      if (degerOf(birim?.UnitType) !== "LENGTHUNIT") continue;
      const olcek = siOlcegi(api, W, modelID, birim, 0);
      if (olcek !== null) return olcek;
    }
  } catch {
    /* aşağıda uyarı verilir */
  }
  uyarilar.push("Uzunluk birimi okunamadı; metre varsayıldı. Ölçüleri kontrol edin.");
  return 1;
}

function siOlcegi(api: IfcApiBenzeri, W: IfcSabitleri, modelID: number, birim: any, derinlik: number): number | null {
  if (!birim || derinlik > 3) return null;
  if (birim.type === W.IFCSIUNIT) {
    const onek = degerOf(birim.Prefix);
    return onek ? (SI_ONEKLERI[String(onek)] ?? null) : 1;
  }
  if (birim.type === W.IFCCONVERSIONBASEDUNIT) {
    const ad = String(degerOf(birim.Name) ?? "").toUpperCase();
    if (ad === "FOOT") return 0.3048;
    if (ad === "INCH") return 0.0254;
    const mwu = api.GetLine(modelID, refId(birim.ConversionFactor) ?? -1);
    const katsayi = Number(degerOf(mwu?.ValueComponent));
    const alt = api.GetLine(modelID, refId(mwu?.UnitComponent) ?? -1);
    const altOlcek = siOlcegi(api, W, modelID, alt, derinlik + 1);
    if (Number.isFinite(katsayi) && altOlcek !== null) return katsayi * altOlcek;
  }
  return null;
}

function olculeriOku(api: IfcApiBenzeri, W: IfcSabitleri, modelID: number, tanimId: number, onbellek: Map<number, Olcu[]>): Olcu[] {
  const var_ = onbellek.get(tanimId);
  if (var_) return var_;
  const olcular: Olcu[] = [];
  try {
    const tanim = api.GetLine(modelID, tanimId);
    if (tanim?.type === W.IFCELEMENTQUANTITY) {
      for (const q of liste(tanim.Quantities)) {
        const satir = api.GetLine(modelID, refId(q) ?? -1);
        if (satir?.type !== W.IFCQUANTITYLENGTH) continue;
        const v = Number(degerOf(satir.LengthValue));
        if (Number.isFinite(v)) olcular.push({ ad: normalize(String(degerOf(satir.Name) ?? "")), deger: v, kaynak: "qto" });
      }
    } else if (tanim?.type === W.IFCPROPERTYSET) {
      for (const p of liste(tanim.HasProperties)) {
        const satir = api.GetLine(modelID, refId(p) ?? -1);
        if (satir?.type !== W.IFCPROPERTYSINGLEVALUE) continue;
        const v = Number(degerOf(satir.NominalValue));
        if (Number.isFinite(v)) olcular.push({ ad: normalize(String(degerOf(satir.Name) ?? "")), deger: v, kaynak: "pset" });
      }
    }
  } catch {
    /* okunamayan küme atlanır */
  }
  onbellek.set(tanimId, olcular);
  return olcular;
}

function sec(olcular: Olcu[], adlar: string[]): Olcu | undefined {
  // Önce Qto (hesaplanmış miktar), sonra Pset; aday adlarda öncelik sırası korunur
  for (const kaynak of ["qto", "pset"] as const) {
    for (const ad of adlar) {
      const b = olcular.find((o) => o.kaynak === kaynak && o.ad === ad);
      if (b) return b;
    }
  }
  return undefined;
}

function yuvarla(x: number, n = 3): number {
  const k = 10 ** n;
  return Math.round(x * k) / k;
}

export function metrajCikar(api: IfcApiBenzeri, W: IfcSabitleri, modelID: number): IfcMetrajSonucu {
  const uyarilar: string[] = [];
  const birim = uzunlukBirimiBul(api, W, modelID, uyarilar);

  // eleman → özellik/miktar kümesi tanımları
  const tanimlar = new Map<number, number[]>();
  const iliskiler = api.GetLineIDsWithType(modelID, W.IFCRELDEFINESBYPROPERTIES);
  for (let i = 0; i < iliskiler.size(); i++) {
    const rel = api.GetLine(modelID, iliskiler.get(i));
    const tanimId = refId(rel?.RelatingPropertyDefinition);
    if (tanimId === null) continue;
    for (const o of liste(rel.RelatedObjects)) {
      const eid = refId(o);
      if (eid === null) continue;
      const l = tanimlar.get(eid);
      if (l) l.push(tanimId);
      else tanimlar.set(eid, [tanimId]);
    }
  }

  const onbellek = new Map<number, Olcu[]>();
  const elemanlar: IfcEleman[] = [];
  for (const { sinif, kategori } of SINIFLAR) {
    const tip = W[sinif];
    if (typeof tip !== "number") continue;
    const idler = api.GetLineIDsWithType(modelID, tip);
    for (let i = 0; i < idler.size(); i++) {
      const id = idler.get(i);
      const satir = api.GetLine(modelID, id);
      const olcular = (tanimlar.get(id) ?? []).flatMap((t) => olculeriOku(api, W, modelID, t, onbellek));
      const e: IfcEleman = {
        expressId: id,
        ifcSinifi: sinif,
        kategori,
        ad: String(degerOf(satir?.Name) ?? `${sinif}_${id}`),
      };
      const uz = sec(olcular, UZUNLUK_ADLARI);
      if (uz) e.uzunluk_m = yuvarla(uz.deger * birim);
      if (kategori === "boru" || kategori === "kablo") {
        const c = sec(olcular, CAP_ADLARI);
        if (c) {
          e.disCap_mm = yuvarla(c.deger * birim * 1000, 2);
          e.capOzellikAdi = c.ad;
        }
      }
      if (kategori === "kanal" || kategori === "tava") {
        const g = sec(olcular, GENISLIK_ADLARI);
        const y = sec(olcular, YUKSEKLIK_ADLARI);
        if (g) e.genislik_mm = yuvarla(g.deger * birim * 1000, 1);
        if (y) e.yukseklik_mm = yuvarla(y.deger * birim * 1000, 1);
      }
      elemanlar.push(e);
    }
  }

  // Gruplama: sınıf + boyut
  const harita = new Map<string, MetrajGrubu>();
  for (const e of elemanlar) {
    let etiket = "—";
    if (e.disCap_mm !== undefined) etiket = `Ø${e.disCap_mm} mm`;
    else if (e.genislik_mm !== undefined && e.yukseklik_mm !== undefined) etiket = `${e.genislik_mm}×${e.yukseklik_mm} mm`;
    const anahtar = `${e.ifcSinifi}|${etiket}`;
    let g = harita.get(anahtar);
    if (!g) {
      g = {
        kategori: e.kategori,
        ifcSinifi: e.ifcSinifi,
        etiket,
        disCap_mm: e.disCap_mm,
        genislik_mm: e.genislik_mm,
        yukseklik_mm: e.yukseklik_mm,
        adet: 0,
        toplamUzunluk_m: 0,
        enUzunEleman_m: 0,
        uzunluguOlmayanAdet: 0,
      };
      harita.set(anahtar, g);
    }
    g.adet += 1;
    if (e.uzunluk_m !== undefined) {
      g.toplamUzunluk_m = yuvarla(g.toplamUzunluk_m + e.uzunluk_m);
      g.enUzunEleman_m = Math.max(g.enUzunEleman_m, e.uzunluk_m);
    } else if (e.kategori !== "ekipman") {
      g.uzunluguOlmayanAdet += 1;
    }
  }
  const gruplar = [...harita.values()].sort((a, b) => a.ifcSinifi.localeCompare(b.ifcSinifi) || a.etiket.localeCompare(b.etiket, "tr"));
  const eksik = gruplar.reduce((t, g) => t + g.uzunluguOlmayanAdet, 0);
  if (eksik > 0) {
    uyarilar.push(`${eksik} doğrusal elemanda uzunluk miktarı (Qto) bulunamadı; toplamlara dahil edilmedi. Modeli Qto/BaseQuantities ile dışa aktarın.`);
  }
  if (elemanlar.length === 0) {
    uyarilar.push("Desteklenen eleman (boru, kanal, kablo, tava, ekipman) bulunamadı.");
  }

  return { uzunlukBirimi_m: birim, uyarilar, elemanlar, gruplar };
}
