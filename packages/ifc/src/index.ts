/**
 * @metranik/ifc — BIM/IFC metraj çıkarımı
 */
export * from "./types";
export * from "./okuyucu";
export * from "./mapper";

import { metrajCikar } from "./okuyucu";
import { modullereEsle } from "./mapper";

export interface IfcIslemSecenekleri {
  /** web-ifc.wasm dosyasının sunulduğu dizin (sonu "/" ile), örn. "/wasm/" */
  wasmDizini?: string;
}

/** Bir .ifc dosyasını tarayıcıda işler. Dosya sunucuya gönderilmez. */
export async function processIfc(file: File, secenekler: IfcIslemSecenekleri = {}) {
  // Baytlar hemen okunur: tarayıcılar seçilen File referansını uzun işlemler (wasm yükleme) sırasında geçersiz kılabilir
  const veri = new Uint8Array(await file.arrayBuffer());
  return processIfcVeri(file.name, veri, secenekler);
}

export async function processIfcVeri(dosyaAdi: string, veri: Uint8Array, secenekler: IfcIslemSecenekleri = {}) {
  const baslangic = performance.now();
  const W = await import("web-ifc");
  const api = new W.IfcAPI();
  // ikinci parametre true: yol betik dizinine göre değil, olduğu gibi (mutlak) kullanılır
  if (secenekler.wasmDizini) api.SetWasmPath(secenekler.wasmDizini, true);
  await api.Init();
  const modelID = api.OpenModel(veri);
  try {
    const metraj = metrajCikar(api as never, W as never, modelID);
    return { dosyaAdi, metraj, oneriler: modullereEsle(metraj), sureMs: performance.now() - baslangic };
  } finally {
    api.CloseModel(modelID);
  }
}
