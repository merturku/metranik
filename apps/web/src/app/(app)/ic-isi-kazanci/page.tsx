"use client";

import { icIsiKazanci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IcIsiKazanciPage() {
  return (
    <CalcPage
      module={icIsiKazanci}
      standardsLabel="ASHRAE Fundamentals — Nonresidential Cooling and Heating Load Calculations"
      description="Mahaldeki insan, aydınlatma ve ekipmanın verdiği duyulur ve gizli iç ısı kazancını toplar; soğutma yükü hesabına girdi sağlar."
      formula="Q = n·(q_duyulur + q_gizli) + P_aydınlatma·F_balast + P_ekipman·F_kullanım"
      engineeringNote="Kişi başı ısı değerleri aktiviteye bağlıdır (ofis oturma yaklaşık 75 W duyulur + 55 W gizli, ASHRAE tablolarından teyit edin). Aydınlatma balast faktörü LED sürücü/flüoresan için 1,0–1,2'dir. Işınımlı kazancın zaman gecikmesi (RTS/CLTD) uygulanmadığından sonuç anlık, en kötü durum yaklaşımıdır; ayrıntılı soğutma yükü için Soğutma Yükü modülüne girdi olarak kullanın."
      fields={[
        { key: "kisiSayisi", label: "Kişi Sayısı", type: "number", min: 0, step: 1 },
        { key: "kisiDuyulur_W", label: "Kişi Başı Duyulur Isı (W)", type: "number", min: 0, step: 5 },
        { key: "kisiGizli_W", label: "Kişi Başı Gizli Isı (W)", type: "number", min: 0, step: 5 },
        { key: "aydinlatmaGucu_W", label: "Aydınlatma Gücü (W)", type: "number", min: 0, step: 50 },
        { key: "aydinlatmaBalastFaktoru", label: "Aydınlatma Balast Faktörü (1,0–1,5)", type: "number", min: 1, step: 0.05 },
        { key: "ekipmanGucu_W", label: "Ekipman Anma Gücü (W)", type: "number", min: 0, step: 100 },
        { key: "ekipmanKullanimFaktoru", label: "Ekipman Kullanım Faktörü (0–1)", type: "number", min: 0, step: 0.05 },
      ]}
      defaults={{ kisiSayisi: 10, kisiDuyulur_W: 75, kisiGizli_W: 55, aydinlatmaGucu_W: 800, aydinlatmaBalastFaktoru: 1.2, ekipmanGucu_W: 2000, ekipmanKullanimFaktoru: 0.7 }}
      mainUnit="W (toplam iç ısı kazancı)"
      mainValueKey="toplam_W"
      mainDecimals={0}
      intermediateLabels={{
        insan_duyulur_W: "İnsan Duyulur (W)",
        insan_gizli_W: "İnsan Gizli (W)",
        aydinlatma_W: "Aydınlatma (W)",
        ekipman_W: "Ekipman (W)",
        toplam_duyulur_W: "Toplam Duyulur (W)",
        duyulur_isi_orani: "Duyulur Isı Oranı",
      }}
    />
  );
}
