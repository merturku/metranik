// Disiplin ve alt kategori etiketlerinin emojileri (yalnız görsel ayrım; etiket metni değişmez).
const EMOJI: Record<string, string> = {
  "Mekanik Tesisat": "⚙️",
  "Elektrik Tesisat": "⚡",
  "İnşaat Hesapları": "🧱",
  Ev: "🏠",
  "Isıtma-Soğutma": "❄️",
  Havalandırma: "🌬️",
  Yangın: "🔥",
  "Sıhhi Tesisat": "🚰",
  Buhar: "♨️",
  "Basınçlı Hava": "💨",
  Doğalgaz: "🛢️",
  Montaj: "🔩",
  "Test & Kontrol": "✅",
};

export function kategoriEmoji(label: string): string {
  return EMOJI[label] ?? "📁";
}
