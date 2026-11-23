"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { girisAktif, hataMetni, supabaseIstemci } from "@/lib/supabase";
import { birlestir, bulutaYedekle, buluttakileriSil, buluttanGetir, type BulutIstemcisi } from "@/lib/bulut";
import { kayitlariGetir, kayitlariTopluYaz } from "@/lib/projeler";
import { ButtonSecondary, Caption } from "@/components/design-system";

const ONAY_KEY = "metranik.bulut_onay";

function onayVarMi(): boolean {
  try {
    return window.localStorage.getItem(ONAY_KEY) === "1";
  } catch {
    return false;
  }
}

// Projelerim sayfasında isteğe bağlı bulut yedeği. Üyelik kapalıysa hiçbir şey çizmez.
export function BulutYedek({ onDegisti }: { onDegisti: () => void }) {
  const [eposta, setEposta] = useState<string | null>(null);
  const [hazir, setHazir] = useState(false);
  const [mesgul, setMesgul] = useState(false);
  const [mesaj, setMesaj] = useState<string | null>(null);

  useEffect(() => {
    const sb = supabaseIstemci();
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => {
      setEposta(data.session?.user.email ?? null);
      setHazir(true);
    });
  }, []);

  if (!girisAktif || !hazir) return null;
  if (!eposta) {
    return (
      <Caption>
        Projelerinizi buluta yedeklemek için <Link href="/giris" className="text-accent-text hover:underline">giriş yapın</Link>.
      </Caption>
    );
  }

  const sb = supabaseIstemci() as unknown as BulutIstemcisi;

  function onayAl(): boolean {
    if (onayVarMi()) return true;
    const tamam = window.confirm(
      "Kayıtlı hesaplarınız (proje adı, girdiler, sonuçlar) hesabınıza bağlı olarak Supabase sunucularında saklanacak. " +
        "Bunu istediğiniz zaman 'Buluttakileri sil' ile kaldırabilirsiniz. Devam edilsin mi?",
    );
    if (tamam) {
      try {
        window.localStorage.setItem(ONAY_KEY, "1");
      } catch {
        /* depolama kapalı: her seferinde tekrar sorulur */
      }
    }
    return tamam;
  }

  async function calistir(is: () => Promise<string>) {
    setMesgul(true);
    setMesaj(null);
    try {
      setMesaj(await is());
    } catch (e) {
      setMesaj(hataMetni(e instanceof Error ? e.message : "bilinmeyen hata"));
    } finally {
      setMesgul(false);
    }
  }

  return (
    <div className="rounded-lg border border-border px-3 py-3">
      <Caption>Bulut yedeği · {eposta}</Caption>
      <div className="mt-2 flex flex-wrap gap-2">
        <ButtonSecondary
          disabled={mesgul}
          onClick={() => onayAl() && calistir(async () => `${await bulutaYedekle(sb, kayitlariGetir())} kayıt buluta yedeklendi.`)}
        >
          Buluta yedekle
        </ButtonSecondary>
        <ButtonSecondary
          disabled={mesgul}
          onClick={() =>
            onayAl() &&
            calistir(async () => {
              const { liste, eklenen } = birlestir(kayitlariGetir(), await buluttanGetir(sb));
              if (eklenen > 0) kayitlariTopluYaz(liste);
              onDegisti();
              return eklenen > 0 ? `${eklenen} kayıt buluttan eklendi (mevcut kayıtlarınız korundu).` : "Bulutta yeni kayıt yok.";
            })
          }
        >
          Buluttan ekle
        </ButtonSecondary>
        <ButtonSecondary
          disabled={mesgul}
          onClick={() => {
            if (!window.confirm("Buluttaki tüm kayıtlarınız kalıcı olarak silinecek. Bu cihazdaki kayıtlar silinmez. Devam edilsin mi?")) return;
            void calistir(async () => {
              await buluttakileriSil(sb);
              return "Buluttaki kayıtlarınız silindi.";
            });
          }}
        >
          Buluttakileri sil
        </ButtonSecondary>
      </div>
      {mesaj && <p role="status" className="mt-2 text-caption text-text-secondary">{mesaj}</p>}
    </div>
  );
}
