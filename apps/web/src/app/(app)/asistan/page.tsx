"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Body, Caption, ButtonPrimary, Headline } from "@/components/design-system";

interface Hesap {
  modulId: string;
  baslik: string;
  sonuc: Record<string, unknown> | null;
  standartlar: string[];
  hukum?: { status: string; note: string };
  href: string;
}
interface Mesaj {
  rol: "kullanici" | "asistan";
  icerik: string;
  hesaplar?: Hesap[];
}

const ORNEKLER = [
  "85 m² çift camlı dairenin ısıtma yükü kaç kW?",
  "20 kW'lık üç fazlı motor için kablo kesiti seçmem lazım",
  "Fan devrini 1450'den 1200 rpm'e düşürürsem güç ne kadar azalır?",
];

function sonucMetni(s: Hesap["sonuc"]): string {
  if (!s) return "—";
  return Object.entries(s)
    .map(([k, v]) => `${k}: ${typeof v === "number" ? Number(v.toPrecision(5)) : String(v)}`)
    .join(" · ");
}

export default function AsistanSayfasi() {
  const [aktif, setAktif] = useState<boolean | null>(null);
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([]);
  const [girdi, setGirdi] = useState("");
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const alt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/asistan")
      .then((r) => r.json())
      .then((d: { aktif?: boolean }) => setAktif(!!d.aktif))
      .catch(() => setAktif(false));
  }, []);

  useEffect(() => {
    alt.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar, mesgul]);

  async function gonder(metin: string) {
    const t = metin.trim();
    if (!t || mesgul) return;
    const yeni: Mesaj[] = [...mesajlar, { rol: "kullanici", icerik: t }];
    setMesajlar(yeni);
    setGirdi("");
    setHata(null);
    setMesgul(true);
    try {
      const r = await fetch("/api/asistan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mesajlar: yeni.slice(-20).map((m) => ({ rol: m.rol, icerik: m.icerik })) }),
      });
      const d = (await r.json()) as { yanit?: string; hesaplar?: Hesap[]; hata?: string };
      if (!r.ok || !d.yanit) setHata(d.hata ?? "Yanıt alınamadı.");
      else setMesajlar([...yeni, { rol: "asistan", icerik: d.yanit, hesaplar: d.hesaplar }]);
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setMesgul(false);
    }
  }

  if (aktif === false) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-16">
        <Headline>AI asistan şu an kapalı</Headline>
        <Body className="mt-3">
          Asistan etkinleştirildiğinde problemi cümleyle anlatırsınız; doğru modülü seçer ve hesabı deterministik motora
          yaptırır. Şimdilik modülleri sol menüden veya Kontrol Merkezi’nden kullanabilirsiniz.
        </Body>
        <Link href="/uygulama" className="mt-6 inline-block text-accent-text hover:underline">
          Kontrol Merkezi’ne dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-[760px] flex-col px-4 py-6">
      <Headline>AI Asistan</Headline>
      <Caption className="mt-1">
        Sayıları asistan değil, hesap motoru üretir. Mesajlarınız yanıt üretmek için yapay zekâ servisine iletilir; kişisel
        veya gizli proje bilgisi yazmayın.
      </Caption>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto" aria-live="polite">
        {mesajlar.length === 0 && (
          <div className="space-y-2">
            <Body>Örnek sorular:</Body>
            {ORNEKLER.map((o) => (
              <button
                key={o}
                onClick={() => gonder(o)}
                className="block w-full rounded-lg border border-border px-3 py-2 text-left text-body text-text-secondary hover:text-text-primary"
              >
                {o}
              </button>
            ))}
          </div>
        )}
        {mesajlar.map((m, i) => (
          <div key={i} className={m.rol === "kullanici" ? "text-right" : ""}>
            <div
              className={`inline-block max-w-[92%] whitespace-pre-wrap rounded-lg px-3 py-2 text-left text-body ${
                m.rol === "kullanici" ? "bg-accent/10 text-text-primary" : "border border-border text-text-primary"
              }`}
            >
              {m.icerik}
            </div>
            {m.hesaplar?.map((h, j) => (
              <div key={j} className="mt-2 rounded-lg border border-border bg-surface px-3 py-2 text-left">
                <div className="text-body font-medium text-text-primary">{h.baslik}</div>
                <Caption>{sonucMetni(h.sonuc)}</Caption>
                {h.standartlar.length > 0 && <Caption>Standart: {h.standartlar.join(", ")}</Caption>}
                {h.hukum && <Caption>Hüküm: {h.hukum.status} — {h.hukum.note}</Caption>}
                <Link href={h.href} className="mt-1 inline-block text-caption font-medium text-accent-text hover:underline">
                  Modülde aç ve incele
                </Link>
              </div>
            ))}
          </div>
        ))}
        {mesgul && <Caption>Asistan hesaplıyor…</Caption>}
        {hata && <p role="alert" className="text-body text-red-600">{hata}</p>}
        <div ref={alt} />
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          gonder(girdi);
        }}
      >
        <input
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          maxLength={2000}
          placeholder="Problemi yazın…"
          aria-label="Mesajınız"
          className="min-w-0 flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-body text-text-primary"
        />
        <ButtonPrimary type="submit" disabled={mesgul || !girdi.trim() || aktif === null}>
          Gönder
        </ButtonPrimary>
      </form>
    </div>
  );
}
