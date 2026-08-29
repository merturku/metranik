# Product

## Register

product

## Users

MEP/mekanik/elektrik/inşaat mühendisleri, teknik ofisler, denetçiler ve rol bazlı
olarak ev sahipleri. Kullanım bağlamı iş odaklı: bir hesap girdisi belirleyip hızlı,
denetlenebilir bir sonuç almak istiyorlar — masaüstünde çalışırken ya da sahada
mobil üzerinden.

## Product Purpose

Mühendislik hesap platformu (rakip: projenik.com). Fark üç eksende: BIM/IFC-native
metraj, AI asistan (yalnız modül seçer/girdi önerir, hesabı asla yapmaz) ve
bulut+ekip senkronu. Başarı: mühendisin sonuca güvenip imzalayabilmesi — her
sayının nereden geldiği görünür olmalı.

## Brand Personality

Kesin, güvenilir, teknik — ama sıcak ve editoryal, steril değil. Karar (2026-07-21):
görsel sistem (renk paleti, radius, gölge dili) bilinçli olarak projenik.com'un canlı
CSS'inden birebir alındı: koyu, sıcak terracotta/kahve tonlar (#0d0a08 zemin, #c65a33
aksan), 12/20px radius, hafif döndürülmüş "yakında" etiketleri. İçerik/kopya kaynağa
ait değil, orijinal — sahte istatistik, AutoCAD/sponsorluk gibi bize ait olmayan
iddialar kopyalanmadı.

**Tipografi kararı (2026-08-29, güncellendi):** İlk kararda projenik.com'un font
ikilisi (Sora + JetBrains Mono) de birebir alınmıştı; kullanıcı geri bildirimiyle
("yapay zeka kırıntısı", "herkeste aynı font") bu değiştirildi — Sora+JetBrains Mono,
sayısız AI-üretimi/şablon SaaS arayüzünde birebir aynı şekilde kullanılan, artık
kategori-refleksi haline gelmiş bir ikili. Yerine **IBM Plex Sans + IBM Plex Mono**
geçti: aynı ailenin iki üyesi olduğu için görsel DNA'sı tutarlı, IBM'in mühendislik
mirası "teknik/hassas" hissi Metranik'in kimliğiyle örtüşüyor, ama Sora/Inter/Space
Grotesk/Manrope kadar doygun (saturated) bir kategori klişesi değil. Renk paleti
(projenik kaynaklı) değişmedi, yalnız tipografi bağımsız bir karar.

## Anti-references

Referans değil, kaynak: projenik.com'un görsel sistemi artık taban alınıyor (yukarıya
bakın). Kaçınılan şey hâlâ jenerik SaaS klişeleri — hero-metric şablonu, aynı boyutlu
ikon-kart ızgaraları, gradyan metin, camsı (glassmorphism) süs.

## Design Principles

- Şeffaflık önce: her sonuç ara değerleriyle birlikte gösterilir, kara kutu yok.
- Güven görsel dilde de kurulur: kesin hizalama, gürültüsüz hiyerarşi, dağınıklık yok.
- Araç, vitrin değil: dekorasyon işlevi desteklemiyorsa yok.
- Standart atıfları birinci sınıf vatandaş: TS/NFPA/IEC referansları arka plana
  gizlenmez, tasarımda görünür bir yer tutar.
- Ön boyutlandırma uyarısı asla gizlenmez veya küçültülmez.

## Accessibility & Inclusion

WCAG AA hedefi: yeterli kontrast, tam klavye erişimi, `prefers-reduced-motion`
desteği. Özel bir ek gereksinim yok.
