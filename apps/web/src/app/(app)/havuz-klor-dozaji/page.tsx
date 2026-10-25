"use client";

import { havuzKlorDozaji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavuzKlorDozajiPage() {
  return (
    <CalcPage
      module={havuzKlorDozaji}
      standardsLabel="Kütle Dengesi (1 ppm = 1 g/m³)"
      description="Havuz suyundaki serbest klor değerini ölçülen değerden hedef değere çıkarmak için kaç kilogram (katı) veya litre (sıvı) klor ürünü eklenmesi gerektiğini hesaplar."
      formula="Aktif klor (g) = (Chedef − Cmevcut) [ppm] × V [m³],   Ürün = Aktif klor / İçerik [g/kg veya g/L]"
      engineeringNote="Ürünün aktif klor içeriği etikette yazar: %65–70 kalsiyum hipoklorit ≈ 650–700 g/kg, %90 trikloroizosiyanürik asit tablet ≈ 900 g/kg, ticari %12,5 sodyum hipoklorit ≈ 125 g/L (sıvı zamanla bozunur, eski üründe içerik düşer). Serbest klor için yaygın aralık 1–3 ppm'dir; şok klorlamadan sonra 3 ppm'in altına inmeden havuza girilmemelidir. Hesap anlık dozdur; güneş ışığı ve kullanıcı sayısına bağlı günlük tüketim ayrıca karşılanmalıdır. Dozlama öncesi pH 7,2–7,6 aralığına getirilmelidir; klor ürünlerini asitle asla karıştırmayın."
      fields={[
        { key: "havuzHacmi_m3", label: "Havuz Su Hacmi (m³)", type: "number", min: 0.5, step: 5 },
        { key: "mevcutSerbestKlor_ppm", label: "Ölçülen Serbest Klor (ppm)", type: "number", min: 0, step: 0.1 },
        { key: "hedefSerbestKlor_ppm", label: "Hedef Serbest Klor (ppm)", type: "number", min: 0.1, step: 0.5 },
        { key: "urunAktifKlorIcerigi_gPerBirim", label: "Ürün Aktif Klor İçeriği (g/kg veya g/L)", type: "number", min: 1, step: 10 },
      ]}
      defaults={{
        havuzHacmi_m3: 50,
        mevcutSerbestKlor_ppm: 0.5,
        hedefSerbestKlor_ppm: 2,
        urunAktifKlorIcerigi_gPerBirim: 650,
      }}
      mainUnit="kg veya L ürün"
      mainValueKey="urunMiktari_kgVeyaL"
      mainDecimals={3}
      intermediateLabels={{
        klor_artisi_ppm: "Gereken Klor Artışı (ppm)",
        gereken_aktif_klor_g: "Gereken Aktif Klor (g)",
        urun_miktari_g_veya_mL: "Ürün Miktarı (g veya mL)",
      }}
    />
  );
}
