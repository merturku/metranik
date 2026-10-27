"use client";

import { akuOdasiHavalandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkuOdasiHavalandirmaPage() {
  return (
    <CalcPage
      module={akuOdasiHavalandirma}
      standardsLabel="EN IEC 62485-2 (EN 50272-2)"
      description="UPS, telekom ve DC sistemlerinin sabit kurşun-asit akü odasında, şarj sırasında açığa çıkan hidrojeni %4 patlama sınırının altında tutmak için gereken havalandırma debisini ve doğal havalandırmada giriş/çıkış açıklığı alanını hesaplar."
      formula="Q = 0,05·n·Igas·Crt·10⁻³  [m³/h],   Igas = I(tampon/hızlı)·fg·fs,   A = 28·Q  [cm²]"
      engineeringNote="0,05 sabiti hidrojenin %4 alt patlama sınırına göre 24 kat seyreltilmesini (v), 1 Ah'te 0,42 L hidrojen oluşumunu (q) ve 5 güvenlik katsayısını (s) birleştirir; Igas'taki fs = 5 ise yaşlanmış/arızalı hücreleri karşılar. VRLA (kapalı, valf ayarlı) akülerde gazın büyük kısmı geri birleştiği için fg = 0,2'dir. Tasarım genellikle en kötü durum olan hızlı (boost/eşitleme) şarja göre yapılır; yalnız tampon şarj uygulanan sistemlerde tampon değeri kullanılabilir. Crt, kurşun-asit için C10 anma kapasitesidir. Doğal havalandırmada giriş ve çıkış açıklıkları ayrı ayrı A kadar olmalı, karşılıklı duvarlarda (aynı duvardaysa en az 2 m arayla) bulunmalı, çıkış tavana yakın konmalıdır. Igas değerleri standardın tipik değerleridir; akü üreticisinin verisiyle teyit edin."
      fields={[
        { key: "hucreSayisi", label: "Hücre Sayısı n (12 V blok = 6 hücre)", type: "number", min: 1, step: 1 },
        { key: "kapasite_Crt_Ah", label: "Anma Kapasitesi Crt (Ah, C10)", type: "number", min: 1, step: 10 },
        {
          key: "akuTipi",
          label: "Akü Tipi",
          type: "select",
          options: [
            { value: "vrla", label: "VRLA — kapalı/valf ayarlı (AGM, jel), fg 0,2" },
            { value: "acik", label: "Açık (sulu) kurşun-asit, Sb < %3, fg 1" },
          ],
        },
        {
          key: "sarjModu",
          label: "Şarj Modu",
          type: "select",
          options: [
            { value: "hizli", label: "Hızlı / eşitleme şarjı (boost)" },
            { value: "tampon", label: "Tampon şarj (float)" },
          ],
        },
      ]}
      defaults={{ hucreSayisi: 24, kapasite_Crt_Ah: 200, akuTipi: "vrla", sarjModu: "hizli" }}
      mainUnit="m³/h (havalandırma debisi)"
      mainValueKey="havaDebisi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        sarj_akimi_mA_Ah: "Şarj Akımı (mA/Ah)",
        gaz_yayilim_faktoru_fg: "Gaz Yayılım Faktörü fg",
        gazlasma_akimi_Igas_mA_Ah: "Gazlaşma Akımı Igas (mA/Ah)",
        dogal_havalandirma_acikligi_cm2: "Doğal Havalandırma Açıklığı A (cm², giriş ve çıkış)",
      }}
    />
  );
}
