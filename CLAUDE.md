# NusaWorld

## Ringkasan Produk

NusaWorld adalah platform belajar bahasa Arab berbasis gamifikasi: pengguna belajar kosakata, tata bahasa, dan percakapan Arab lewat sistem permainan (poin/koin, level, dan tantangan) yang membuat proses belajar terasa seperti bermain. Tujuannya membuat belajar bahasa Arab lebih menyenangkan, konsisten, dan mudah diakses untuk pemula.

## Palet Warna Brand

| Nama         | Hex       | Pemakaian                  |
|--------------|-----------|----------------------------|
| Ocean Blue   | `#1B6CA8` | Warna utama / primary      |
| Island Green | `#2EAF73` | Aksen / sukses             |
| Quest Gold   | `#F5C518` | Highlight / reward / koin  |

**Font:** Nunito (Google Fonts).

## Konvensi Penamaan

- **Komponen React:** `PascalCase` (`HeroSection.tsx`).
- **File utilitas/non-komponen:** `kebab-case` (`format-date.ts`).
- **Variabel & fungsi:** `camelCase`.
- **Konstanta global:** `UPPER_SNAKE_CASE`.
- **Route App Router:** folder huruf kecil sesuai URL (`src/app/dashboard/page.tsx`).
- **Branch git:** `kebab-case` deskriptif (`feature/landing-page`).

## Struktur Saat Ini

- `public/landing.html` — landing page final (HTML statis, **jangan diubah desainnya**).
- `next.config.ts` — rewrite route `/` ke `public/landing.html`.
- `src/app/` — App Router (belum ada `page.tsx` di root karena `/` melayani HTML statis).

## Catatan

- Fitur **game** dan **database** dikerjakan belakangan. Fokus tahap ini hanya menampilkan landing page.
- Belum ada login/auth, belum ada backend.
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS, siap deploy ke Vercel.
