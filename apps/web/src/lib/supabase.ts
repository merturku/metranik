import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Üyelik isteğe bağlıdır: ortam değişkenleri tanımlı değilse giriş arayüzü hiç görünmez
// ve uygulama eskisi gibi üyeliksiz (yalnız localStorage) çalışır. Yalnız anon anahtar kullanılır;
// service_role anahtarı asla istemciye konmaz.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const girisAktif = Boolean(URL && ANON);

let istemci: SupabaseClient | null = null;

export function supabaseIstemci(): SupabaseClient | null {
  if (!URL || !ANON) return null;
  istemci ??= createClient(URL, ANON);
  return istemci;
}

/** Supabase hata iletilerini kullanıcıya Türkçe gösterir. */
export function hataMetni(mesaj: string): string {
  const m = mesaj.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-posta veya parola hatalı.";
  if (m.includes("email not confirmed")) return "E-posta adresiniz henüz doğrulanmadı; gelen kutunuzdaki bağlantıya tıklayın.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Bu e-posta ile zaten bir hesap var; giriş yapın.";
  if (m.includes("password should be at least")) return "Parola en az 8 karakter olmalıdır.";
  if (m.includes("rate limit") || m.includes("too many")) return "Çok fazla deneme yapıldı; biraz sonra tekrar deneyin.";
  if (m.includes("valid email") || m.includes("invalid email")) return "Geçerli bir e-posta adresi girin.";
  return "İşlem tamamlanamadı: " + mesaj;
}
