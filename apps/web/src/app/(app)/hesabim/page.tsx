"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { girisAktif, hataMetni, supabaseIstemci } from "@/lib/supabase";
import { dosyaIndir, favorileriGetir, kayitlariGetir, projeAdlari, yedekOlustur } from "@/lib/projeler";
import { BulutYedek } from "@/components/bulut-yedek";
import { Body, ButtonPrimary, ButtonSecondary, Caption, Headline, Input, InputLabel, Subheading } from "@/components/design-system";

function tarihMetni(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}

interface Ozet {
  hesap: number;
  proje: number;
  favori: number;
}

// Üyelik paneli: hesap bilgisi, cihazdaki veri özeti, bulut yedeği, parola değiştirme, veri indirme.
// Üyelik yapılandırılmamışsa (Supabase anahtarları yok) yalnız bilgi mesajı gösterir.
export default function HesabimSayfasi() {
  const [kullanici, setKullanici] = useState<User | null>(null);
  const [hazir, setHazir] = useState(false);
  const [kurtarma, setKurtarma] = useState(false);
  const [ozet, setOzet] = useState<Ozet>({ hesap: 0, proje: 0, favori: 0 });
  const [yeniParola, setYeniParola] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [mesaj, setMesaj] = useState<{ tur: "hata" | "bilgi"; metin: string } | null>(null);
  const [mesgul, setMesgul] = useState(false);

  const ozetiYenile = useCallback(() => {
    setOzet({ hesap: kayitlariGetir().length, proje: projeAdlari().length, favori: favorileriGetir().length });
  }, []);

  useEffect(() => {
    ozetiYenile();
    const sb = supabaseIstemci();
    if (!sb) return;
    let iptal = false;
    sb.auth.getSession().then(({ data }) => {
      if (iptal) return;
      setKullanici(data.session?.user ?? null);
      setHazir(true);
    });
    const { data: abone } = sb.auth.onAuthStateChange((olay, oturum) => {
      setKullanici(oturum?.user ?? null);
      if (olay === "PASSWORD_RECOVERY") setKurtarma(true);
    });
    return () => {
      iptal = true;
      abone.subscription.unsubscribe();
    };
  }, [ozetiYenile]);

  async function parolaDegistir(e: React.FormEvent) {
    e.preventDefault();
    const sb = supabaseIstemci();
    if (!sb) return;
    if (yeniParola.length < 8) return setMesaj({ tur: "hata", metin: "Parola en az 8 karakter olmalıdır." });
    if (yeniParola !== tekrar) return setMesaj({ tur: "hata", metin: "Parolalar eşleşmiyor." });
    setMesgul(true);
    setMesaj(null);
    try {
      const { error } = await sb.auth.updateUser({ password: yeniParola });
      if (error) throw error;
      setYeniParola("");
      setTekrar("");
      setKurtarma(false);
      setMesaj({ tur: "bilgi", metin: "Parolanız güncellendi." });
    } catch (err) {
      setMesaj({ tur: "hata", metin: hataMetni(err instanceof Error ? err.message : String(err)) });
    } finally {
      setMesgul(false);
    }
  }

  if (!girisAktif) {
    return (
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Headline>Üyelik şu an kapalı</Headline>
        <Body className="mt-3">Metranik üyeliksiz kullanılır; hesaplarınız ve projeleriniz bu cihazda saklanır.</Body>
        <Link href="/projelerim" className="mt-6 inline-block text-accent-text hover:underline">
          Projelerim’e git
        </Link>
      </div>
    );
  }

  if (!hazir) return null;

  if (!kullanici) {
    return (
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Headline>Hesabım</Headline>
        <Body className="mt-3">Bu sayfayı görmek için giriş yapın.</Body>
        <Link href="/giris" className="mt-6 inline-block text-accent-text hover:underline">
          Giriş yap
        </Link>
      </div>
    );
  }

  const dogrulandi = Boolean(kullanici.email_confirmed_at);

  return (
    <div className="mx-auto max-w-[640px] px-6 py-10">
      <Headline>Hesabım</Headline>
      <Body className="mt-2">Üyelik isteğe bağlıdır; hesap modülleri üyeliksiz de çalışır.</Body>

      {kurtarma && (
        <p role="status" className="mt-4 rounded-md border border-border bg-surface-secondary px-3 py-2 text-caption text-text-primary">
          Parola sıfırlama bağlantısıyla geldiniz; aşağıdan yeni parolanızı belirleyin.
        </p>
      )}

      <section className="mt-8" aria-labelledby="hesap-bilgisi">
        <Subheading>
          <span id="hesap-bilgisi">Hesap bilgileri</span>
        </Subheading>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-body">
          <dt className="text-text-secondary">E-posta</dt>
          <dd className="break-all text-text-primary">{kullanici.email}</dd>
          <dt className="text-text-secondary">Doğrulama</dt>
          <dd className="text-text-primary">{dogrulandi ? "E-posta doğrulandı" : "E-posta henüz doğrulanmadı"}</dd>
          <dt className="text-text-secondary">Üyelik tarihi</dt>
          <dd className="text-text-primary">{tarihMetni(kullanici.created_at)}</dd>
          <dt className="text-text-secondary">Son giriş</dt>
          <dd className="text-text-primary">{tarihMetni(kullanici.last_sign_in_at)}</dd>
        </dl>
      </section>

      <section className="mt-8" aria-labelledby="cihaz-verisi">
        <Subheading>
          <span id="cihaz-verisi">Bu cihazdaki veriler</span>
        </Subheading>
        <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
          {[
            ["Kayıtlı hesap", ozet.hesap],
            ["Proje", ozet.proje],
            ["Favori modül", ozet.favori],
          ].map(([ad, n]) => (
            <div key={ad as string} className="rounded-lg border border-border px-3 py-3">
              <dd className="text-headline font-semibold text-text-primary">{n}</dd>
              <dt className="text-caption text-text-secondary">{ad}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Link href="/projelerim" className="text-caption text-accent-text hover:underline">
            Projelerim’i aç
          </Link>
          <ButtonSecondary type="button" onClick={() => dosyaIndir("metranik-yedek.json", yedekOlustur(), "application/json")}>
            Verilerimi indir (JSON)
          </ButtonSecondary>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="bulut-yedegi">
        <Subheading>
          <span id="bulut-yedegi">Bulut yedeği</span>
        </Subheading>
        <Caption className="mt-1 block">
          Yedekleme otomatik değildir; yalnız siz tetiklediğinizde çalışır. Buluttan geri alma yerel kayıtlarınızı silmez, yalnız ekler.
        </Caption>
        <div className="mt-3">
          <BulutYedek onDegisti={ozetiYenile} />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="parola">
        <Subheading>
          <span id="parola">Parolayı değiştir</span>
        </Subheading>
        <form onSubmit={parolaDegistir} className="mt-3 max-w-[360px] space-y-4" noValidate>
          <div>
            <InputLabel htmlFor="yeni-parola">Yeni parola (en az 8 karakter)</InputLabel>
            <Input id="yeni-parola" type="password" autoComplete="new-password" value={yeniParola} onChange={(e) => setYeniParola(e.target.value)} />
          </div>
          <div>
            <InputLabel htmlFor="parola-tekrar">Yeni parola (tekrar)</InputLabel>
            <Input id="parola-tekrar" type="password" autoComplete="new-password" value={tekrar} onChange={(e) => setTekrar(e.target.value)} />
          </div>
          {mesaj && (
            <p role={mesaj.tur === "hata" ? "alert" : "status"} className={`text-caption ${mesaj.tur === "hata" ? "text-error" : "text-text-secondary"}`}>
              {mesaj.metin}
            </p>
          )}
          <ButtonPrimary type="submit" disabled={mesgul}>
            {mesgul ? "Bekleyin…" : "Parolayı güncelle"}
          </ButtonPrimary>
        </form>
      </section>

      <section className="mt-8 border-t border-border pt-6">
        <ButtonSecondary type="button" onClick={() => supabaseIstemci()?.auth.signOut()}>
          Çıkış yap
        </ButtonSecondary>
        <Caption className="mt-4 block">
          Bulut verilerinizi yukarıdan silebilirsiniz. Hesabın kendisinin kalıcı silinmesi için henüz otomatik bir yol yoktur;{" "}
          <Link href="/kvkk" className="text-accent-text hover:underline">
            KVKK metnindeki
          </Link>{" "}
          haklarınız saklıdır.
        </Caption>
      </section>
    </div>
  );
}
