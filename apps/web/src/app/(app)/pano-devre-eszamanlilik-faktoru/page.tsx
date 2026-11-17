"use client";

import { panoDevreEszamanlilikFaktoru } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PanoDevreEszamanlilikFaktoruPage() {
  return (
    <CalcPage
      module={panoDevreEszamanlilikFaktoru}
      standardsLabel={"IEC 61439-1 Tablo 101"}
      description={"Çok devreli panoda devre sayısına göre anma eşzamanlılık faktörünü ve ana barada beklenen tasarım akımını hesaplar."}
      formula={"Idevre,toplam = ΣIn;  Itasarım = ΣIn·RDF;  RDF: 2–3 devre 0,9; 4–5 → 0,8; 6–9 → 0,7; ≥ 10 → 0,6"}
      engineeringNote={"RDF değerleri, üretici ile kullanıcı arasında başka bir anlaşma yoksa IEC 61439-1 Tablo 101'deki tipik değerlerdir (güncel baskıdan teyit edin). Devreler yaklaşık eşit yüklü varsayılır; tek bir büyük yük baskınsa ayrıca toplam hesaba katılmalıdır. Sürekli çalışan yükler için RDF = 1 alın."}
      fields={[
        { key: "devreSayisi", label: "Devre Sayısı", type: "number", step: 1, min: 1 },
        { key: "toplamAkim_A", label: "Devre Anma Akımları Toplamı ΣIn (A)", type: "number", step: 10, min: 0.1 },
      ]}
      defaults={{ devreSayisi: 8, toplamAkim_A: 200 }}
      mainUnit={"A"}
      mainValueKey={"tasarimAkimi_A"}
      mainDecimals={1}
      intermediateLabels={{
        rdf: "Eşzamanlılık Faktörü (RDF)",
        toplam_akim_A: "ΣIn (A)",
      }}
    />
  );
}
