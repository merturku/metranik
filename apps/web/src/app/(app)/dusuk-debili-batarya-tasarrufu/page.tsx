"use client";

import { dusukDebiliBataryaTasarrufu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DusukDebiliBataryaTasarrufuPage() {
  return (
    <CalcPage
      module={dusukDebiliBataryaTasarrufu}
      standardsLabel="Fiziksel Formül"
      description="Eski ve yeni (düşük debili/aeratörlü) duş bataryası debisi arasındaki farka göre yıllık su ve maliyet tasarrufunu hesaplar."
      formula="ΔDebi = Eski Debi − Yeni Debi, Yıllık Tasarruf = ΔDebi × Süre × Gün × Birim Fiyat"
      engineeringNote="LED aydınlatma enerji tasarrufu modülüyle aynı mantığın su tarafına uyarlanmış hâlidir; düşük debili duş başlıkları tipik olarak 6-9 L/dk debiye iner (standart bataryalarda 10-15 L/dk)."
      fields={[
        {
          key: "eskiDebi_L_dk",
          label: "Eski Debi (L/dk)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "yeniDebi_L_dk",
          label: "Yeni Debi (L/dk)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "gunlukKullanimSuresi_dk",
          label: "Günlük Kullanım Süresi (dk)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "yillikGunSayisi",
          label: "Yıllık Gün Sayısı",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "birimFiyat_TLm3",
          label: "Birim Fiyat (TL/m³)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        eskiDebi_L_dk: 12,
        yeniDebi_L_dk: 8,
        gunlukKullanimSuresi_dk: 10,
        yillikGunSayisi: 350,
        birimFiyat_TLm3: 45,
      }}
      mainUnit="TL"
      mainValueKey="yillikTasarruf_TL"
      intermediateLabels={{
        debiFarki_L_dk: "Debi Farkı (L/dk)",
        yillikSuTasarrufu_m3: "Yıllık Su Tasarrufu (m³)",
      }}
    />
  );
}
