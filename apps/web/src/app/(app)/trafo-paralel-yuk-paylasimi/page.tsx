"use client";

import { trafoParalelYukPaylasimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoParalelYukPaylasimiPage() {
  return (
    <CalcPage
      module={trafoParalelYukPaylasimi}
      standardsLabel="IEC 60076-8"
      description="Paralel çalışan iki trafonun toplam yükü kısa devre gerilimlerine (uk) göre nasıl paylaştığını hesaplar; hangi trafonun aşırı yüklendiğini ve hiçbirini aşırı yüklemeden çekilebilecek en büyük toplam yükü gösterir."
      formula="Si = Syük × (Sri/uki) / Σ(Srj/ukj),   Smaks = min(uk) × Σ(Srj/ukj)"
      engineeringNote="Paralel çalışma için trafoların dönüştürme oranı ve bağlantı grubu aynı olmalı, uk değerleri birbirine yakın olmalıdır (fark %10'u aşmamalı). uk'su düşük trafo daha fazla yük alır ve anma gücüne önce ulaşır; bu yüzden kurulu gücün tamamı kullanılamaz. Hesap X/R oranlarının benzer olduğunu varsayar; X/R farkı büyükse aralarında dolaşım akımı ve ek kayıp oluşur. Anma güçleri çok farklı trafolar (örn. 1:3'ten büyük oran) paralel bağlanmamalıdır."
      fields={[
        { key: "trafo1Guc_kVA", label: "T1 Anma Gücü (kVA)", type: "number", min: 1, step: 50 },
        { key: "trafo1Uk_yuzde", label: "T1 Kısa Devre Gerilimi uk (%)", type: "number", min: 0.5, step: 0.5 },
        { key: "trafo2Guc_kVA", label: "T2 Anma Gücü (kVA)", type: "number", min: 1, step: 50 },
        { key: "trafo2Uk_yuzde", label: "T2 Kısa Devre Gerilimi uk (%)", type: "number", min: 0.5, step: 0.5 },
        { key: "toplamYuk_kVA", label: "Toplam Yük (kVA)", type: "number", min: 1, step: 50 },
      ]}
      defaults={{
        trafo1Guc_kVA: 1000,
        trafo1Uk_yuzde: 6,
        trafo2Guc_kVA: 630,
        trafo2Uk_yuzde: 4.5,
        toplamYuk_kVA: 1500,
      }}
      mainUnit="kVA (azami toplam yük)"
      mainValueKey="azamiToplamYuk_kVA"
      mainDecimals={0}
      intermediateLabels={{
        trafo1_yuku_kVA: "T1 Yükü (kVA)",
        trafo1_yuklenme_yuzde: "T1 Yüklenme (%)",
        trafo2_yuku_kVA: "T2 Yükü (kVA)",
        trafo2_yuklenme_yuzde: "T2 Yüklenme (%)",
        uk_farki_yuzde: "uk Farkı (%)",
        kurulu_guc_kullanim_orani_yuzde: "Kurulu Gücün Kullanılabilen Oranı (%)",
      }}
    />
  );
}
