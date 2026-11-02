"use client";

import { anaEsPotansiyelBaglantiIletkeni } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AnaEsPotansiyelBaglantiIletkeniPage() {
  return (
    <CalcPage
      module={anaEsPotansiyelBaglantiIletkeni}
      standardsLabel="IEC 60364-5-54 §544.1.1 — ana eş potansiyel bağlantı"
      description="Tesisattaki en büyük koruma iletkeni (PE) kesitinden ana eş potansiyel bağlantı iletkeninin minimum bakır kesitini bulur."
      formula="S ≥ 0,5·S_PE,max;   6 mm² ≤ S ≤ 25 mm² (Cu)"
      engineeringNote="Kurallar bakır iletken içindir; alüminyum veya çelik için eşdeğer iletkenlik sağlayan kesit seçilmelidir. Üst sınır 25 mm²'dir (bakır). Sonuç standart kesit dizisine (6/10/16/25) yukarı yuvarlanır. Ek (tamamlayıcı) eş potansiyel bağlantı iletkenleri farklı kurallara tabidir. Topraklama iletkeni için Topraklama İletkeni Kesiti modülüne bakın."
      fields={[{ key: "enBuyukPeKesiti_mm2", label: "Tesisattaki En Büyük PE Kesiti (mm²)", type: "number", min: 1, step: 1 }]}
      defaults={{ enBuyukPeKesiti_mm2: 35 }}
      mainUnit="mm² (Cu, bağlantı iletkeni)"
      mainValueKey="baglantiKesiti_mm2"
      mainDecimals={0}
      intermediateLabels={{
        yari_pe_kesiti_mm2: "0,5 × PE Kesiti (mm²)",
        gerekli_kesit_mm2: "Sınırlanmış Gerekli Kesit (mm²)",
        sinir_durumu: "Belirleyici Kural",
      }}
    />
  );
}
