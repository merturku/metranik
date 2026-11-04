"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { girisAktif, hataMetni, supabaseIstemci } from "@/lib/supabase";
import { ButtonPrimary, Body, Caption, Headline, Input, InputLabel } from "@/components/design-system";

export default function GirisSayfasi() {
  const router = useRouter();
  const [kayitModu, setKayitModu] = useState(false);
  const [eposta, setEposta] = useState("");
  const [parola, setParola] = useState("");
  const [onay, setOnay] = useState(false);
  const [mesaj, setMesaj] = useState<{ tur: "hata" | "bilgi"; metin: string } | null>(null);
  const [mesgul, setMesgul] = useState(false);

  if (!girisAktif) {
    return (
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Headline>Üyelik şu an kapalı</Headline>
        <Body className="mt-3">
          Metranik üyeliksiz kullanılır; hesaplarınız ve projeleriniz bu cihazda saklanır.
        </Body>
        <Link href="/uygulama" className="mt-6 inline-block text-accent-text hover:underline">
          Kontrol Merkezi’ne dön
        </Link>
      </div>
    );
  }

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    const sb = supabaseIstemci();
    if (!sb) return;
    setMesaj(null);
    if (parola.length < 8) {
      setMesaj({ tur: "hata", metin: "Parola en az 8 karakter olmalıdır." });
      return;
    }
    if (kayitModu && !onay) {
      setMesaj({ tur: "hata", metin: "Devam etmek için aydınlatma metnini onaylamalısınız." });
      return;
    }
    setMesgul(true);
    try {
      if (kayitModu) {
        const { data, error } = await sb.auth.signUp({
          email: eposta.trim(),
          password: parola,
          options: { emailRedirectTo: `${window.location.origin}/uygulama` },
        });
        if (error) throw error;
        if (data.session) router.push("/uygulama");
        else setMesaj({ tur: "bilgi", metin: "Doğrulama bağlantısı e-posta adresinize gönderildi. Bağlantıya tıkladıktan sonra giriş yapabilirsiniz." });
      } else {
        const { error } = await sb.auth.signInWithPassword({ email: eposta.trim(), password: parola });
        if (error) throw error;
        router.push("/uygulama");
      }
    } catch (err) {
      setMesaj({ tur: "hata", metin: hataMetni(err instanceof Error ? err.message : String(err)) });
    } finally {
      setMesgul(false);
    }
  }

  async function parolaSifirla() {
    const sb = supabaseIstemci();
    if (!sb || !eposta.trim()) {
      setMesaj({ tur: "hata", metin: "Önce e-posta adresinizi yazın." });
      return;
    }
    const { error } = await sb.auth.resetPasswordForEmail(eposta.trim(), { redirectTo: `${window.location.origin}/uygulama` });
    setMesaj(error ? { tur: "hata", metin: hataMetni(error.message) } : { tur: "bilgi", metin: "Parola sıfırlama bağlantısı gönderildi." });
  }

  return (
    <div className="mx-auto max-w-[420px] px-6 py-16">
      <Headline>{kayitModu ? "Hesap oluştur" : "Giriş yap"}</Headline>
      <Body className="mt-2">
        Üyelik isteğe bağlıdır; hesap modüllerini üye olmadan da kullanabilirsiniz.
      </Body>

      <form onSubmit={gonder} className="mt-6 space-y-4" noValidate>
        <div>
          <InputLabel htmlFor="eposta">E-posta</InputLabel>
          <Input id="eposta" type="email" autoComplete="email" value={eposta} onChange={(e) => setEposta(e.target.value)} required />
        </div>
        <div>
          <InputLabel htmlFor="parola">Parola (en az 8 karakter)</InputLabel>
          <Input
            id="parola"
            type="password"
            autoComplete={kayitModu ? "new-password" : "current-password"}
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />
        </div>

        {kayitModu && (
          <label className="flex items-start gap-2 text-caption text-text-secondary">
            <input type="checkbox" checked={onay} onChange={(e) => setOnay(e.target.checked)} className="mt-0.5" />
            <span>
              <Link href="/kvkk" target="_blank" className="text-accent-text underline">
                Kullanım Koşulları &amp; KVKK aydınlatma metnini
              </Link>{" "}
              okudum; e-posta adresimin hesap oluşturmak amacıyla işlenmesini kabul ediyorum.
            </span>
          </label>
        )}

        {mesaj && (
          <p role={mesaj.tur === "hata" ? "alert" : "status"} className={`text-caption ${mesaj.tur === "hata" ? "text-error" : "text-text-secondary"}`}>
            {mesaj.metin}
          </p>
        )}

        <ButtonPrimary type="submit" disabled={mesgul} className="w-full">
          {mesgul ? "Bekleyin…" : kayitModu ? "Hesap oluştur" : "Giriş yap"}
        </ButtonPrimary>
      </form>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={() => { setKayitModu(!kayitModu); setMesaj(null); }} className="text-caption text-accent-text hover:underline">
          {kayitModu ? "Zaten hesabım var" : "Hesap oluştur"}
        </button>
        {!kayitModu && (
          <button type="button" onClick={parolaSifirla} className="text-caption text-text-secondary hover:underline">
            Parolamı unuttum
          </button>
        )}
      </div>
      <Caption className="mt-8 block">Hesaplarınız ve projeleriniz şimdilik bu cihazda saklanır; bulut eşitleme eklendiğinde ayrıca bildirilecektir.</Caption>
    </div>
  );
}
