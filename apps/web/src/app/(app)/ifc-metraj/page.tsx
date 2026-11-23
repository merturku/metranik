"use client";

import { useState } from "react";
import Link from "next/link";
import { Body, Caption, Headline, ButtonPrimary, ButtonSecondary } from "@/components/design-system";
import { csvOlustur, dosyaIndir } from "@/lib/projeler";
import { TUM_MODULLER } from "@/lib/modules";
import type { IfcMetrajSonucu, ModulOnerisi } from "@metranik/ifc";

interface Sonuc {
  dosyaAdi: string;
  metraj: IfcMetrajSonucu;
  oneriler: ModulOnerisi[];
  sureMs: number;
}

const KATEGORI: Record<string, string> = { boru: "Boru", kanal: "Hava kanalı", kablo: "Kablo", tava: "Kablo tavası", ekipman: "Ekipman" };
const GUVEN: Record<string, string> = { yuksek: "Yüksek güven", orta: "Orta güven", dusuk: "Düşük güven" };

export default function IfcMetrajSayfasi() {
  const [sonuc, setSonuc] = useState<Sonuc | null>(null);
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  async function yukle(e: React.ChangeEvent<HTMLInputElement>) {
    const girdi = e.target;
    const dosya = girdi.files?.[0];
    if (!dosya) return;
    if (!dosya.name.toLowerCase().endsWith(".ifc")) {
      setHata("Yalnızca .ifc uzantılı dosyalar desteklenir.");
      return;
    }
    setHata(null);
    setSonuc(null);
    setMesgul(true);
    try {
      // Dosya baytları ilk iş olarak okunur (seçili File referansı uzun işlemde geçersiz kalabiliyor)
      const veri = new Uint8Array(await dosya.arrayBuffer());
      const { processIfcVeri } = await import("@metranik/ifc");
      setSonuc(await processIfcVeri(dosya.name, veri, { wasmDizini: "/wasm/" }));
    } catch (err) {
      console.error("IFC işleme hatası:", err);
      setHata("IFC dosyası okunamadı. Dosyanın geçerli bir IFC (STEP) dosyası olduğundan emin olun.");
    } finally {
      setMesgul(false);
      girdi.value = ""; // aynı dosyayı yeniden seçebilmek için, okuma bittikten sonra sıfırla
    }
  }

  function csvIndir() {
    if (!sonuc) return;
    const satirlar: string[][] = [["Kategori", "IFC sınıfı", "Boyut", "Adet", "Toplam uzunluk (m)", "Uzunluğu olmayan adet"]];
    for (const g of sonuc.metraj.gruplar) {
      satirlar.push([KATEGORI[g.kategori] ?? g.kategori, g.ifcSinifi, g.etiket, String(g.adet), g.kategori === "ekipman" ? "" : String(g.toplamUzunluk_m), String(g.uzunluguOlmayanAdet)]);
    }
    dosyaIndir(`${sonuc.dosyaAdi.replace(/\.ifc$/i, "")}-metraj.csv`, csvOlustur(satirlar));
  }

  function baglanti(o: ModulOnerisi): string {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(o.girdiler)) q.set(k, String(v));
    const taban = TUM_MODULLER.find((m) => m.id === o.moduleId)?.href ?? `/${o.moduleId}`;
    return `${taban}?${q.toString()}`;
  }

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-8">
      <Headline>IFC Metraj</Headline>
      <Body className="mt-2 text-text-secondary">
        BIM modelinizi (.ifc) yükleyin; boru, hava kanalı, kablo, tava ve ekipman metrajı çıkarılır, uygun hesap modüllerinde girdiler
        önceden doldurulur. Dosya sunucuya gönderilmez, tarayıcınızda işlenir.
      </Body>

      <div className="mt-6 rounded-lg border-2 border-dashed border-border bg-surface p-10 text-center">
        <input id="ifc-input" type="file" accept=".ifc" onChange={yukle} disabled={mesgul} className="sr-only" />
        <label htmlFor="ifc-input" className="cursor-pointer text-accent-text hover:underline">
          {mesgul ? "İşleniyor…" : "IFC dosyası seçin"}
        </label>
      </div>

      {hata && <p role="alert" className="mt-4 text-body text-red-600">{hata}</p>}

      {sonuc && (
        <div className="mt-8 space-y-8">
          <div>
            <Caption>
              {sonuc.dosyaAdi} · {sonuc.metraj.elemanlar.length} eleman · {(sonuc.sureMs / 1000).toFixed(1)} sn · 1 IFC birimi ={" "}
              {sonuc.metraj.uzunlukBirimi_m} m
            </Caption>
            {sonuc.metraj.uyarilar.map((u, i) => (
              <p key={i} className="mt-2 rounded-lg border border-border px-3 py-2 text-body text-text-secondary">⚠ {u}</p>
            ))}
          </div>

          {sonuc.metraj.gruplar.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Headline>Metraj ({sonuc.metraj.gruplar.length} grup)</Headline>
                <ButtonSecondary onClick={csvIndir}>Excel (CSV)</ButtonSecondary>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-body">
                  <thead>
                    <tr className="border-b border-border bg-surface text-left">
                      <th className="px-3 py-2">Kategori</th>
                      <th className="px-3 py-2">IFC sınıfı</th>
                      <th className="px-3 py-2">Boyut</th>
                      <th className="px-3 py-2 text-right">Adet</th>
                      <th className="px-3 py-2 text-right">Toplam uzunluk (m)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sonuc.metraj.gruplar.map((g, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="px-3 py-2">{KATEGORI[g.kategori]}</td>
                        <td className="px-3 py-2 font-mono text-caption">{g.ifcSinifi}</td>
                        <td className="px-3 py-2">{g.etiket}</td>
                        <td className="px-3 py-2 text-right">{g.adet}</td>
                        <td className="px-3 py-2 text-right">
                          {g.kategori === "ekipman" ? "—" : g.toplamUzunluk_m.toFixed(2)}
                          {g.uzunluguOlmayanAdet > 0 && <span className="text-text-tertiary"> (+{g.uzunluguOlmayanAdet} uzunluksuz)</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {sonuc.oneriler.length > 0 && (
            <div>
              <Headline>Hesap modülü önerileri</Headline>
              <div className="mt-3 space-y-3">
                {sonuc.oneriler.map((o, i) => (
                  <div key={i} className="rounded-lg border border-border bg-surface p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Body className="font-medium">{TUM_MODULLER.find((m) => m.id === o.moduleId)?.title ?? o.moduleId}</Body>
                        <Caption>{o.kaynakGrup} · {GUVEN[o.guven]}</Caption>
                        <Caption>{Object.entries(o.girdiler).map(([k, v]) => `${k}: ${v}`).join(" · ")}</Caption>
                        {o.notlar.map((n, j) => <Caption key={j}>• {n}</Caption>)}
                      </div>
                      <Link href={baglanti(o)}>
                        <ButtonPrimary>Modülde aç</ButtonPrimary>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Caption>Metraj ön boyutlandırma amaçlıdır; modeldeki Qto verisinin doğruluğu model hazırlayana aittir.</Caption>
        </div>
      )}
    </div>
  );
}
